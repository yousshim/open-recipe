import { compareSync } from "bcrypt";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  createUnionType,
  Field,
  ObjectType,
} from "type-graphql";
import {
  loginValidationSchema,
  SignupValidationSchema,
} from "../../shared/utils/validation";
import { User } from "../entity/user";
import { LoginInput } from "../type/loginInput";
import { UserInput } from "../type/userInput";

@ObjectType()
class Error {
  @Field()
  message: string;
  @Field((_) => String, { nullable: true })
  path?: string;
  constructor({ message, path }: Error) {
    this.message = message;
    if (path) {
      this.path = path;
    }
  }
}

const UserResult = createUnionType({
  name: "UserResult",
  types: () => [User, Error] as const,
  resolveType: (value) => ("message" in value ? Error : User),
});

@Resolver(User)
export class UserResolver {
  @Mutation((_) => UserResult)
  async createAccount(
    @Arg("userInput") userInput: UserInput,
    @Ctx() { req }: any
  ) {
    try {
      await SignupValidationSchema.validate(userInput);
    } catch ({ path, message }) {
      return new Error({
        path,
        message,
      });
    }
    const user = await User.findOne({ email: userInput.email });
    if (user) {
      return new Error({
        message: "account already exists",
      });
    }
    const newUser = await new User(
      userInput.handle,
      userInput.email,
      userInput.name,
      userInput.password
    ).save();
    req.req.session.user = newUser;
    return newUser;
  }

  @Mutation((_) => UserResult)
  async login(@Arg("loginInput") loginInput: LoginInput, @Ctx() { req }: any) {
    try {
      await loginValidationSchema.validate(loginInput);
    } catch ({ path, message }) {
      return new Error({
        path,
        message,
      });
    }
    if (req.req.session.user) {
      return new Error({
        message: "you are aleady logged in",
      });
    }
    const user = await User.findOne({ email: loginInput.email });
    if (!user) {
      return new Error({
        message: "user does not exist",
      });
    }
    const correctPassword = compareSync(loginInput.password, user.passwordHash);
    if (!correctPassword) {
      return new Error({
        message: "incorrect password",
      });
    }
    req.req.session.user = user;
    return user;
  }

  @Mutation((_) => UserResult)
  logout(@Ctx() { req }: any) {
    if (!req.req.session.user) {
      return new Error({
        message: "you are not logged in",
      });
    }
    const user = req.req.session.user;
    req.req.session.destroy();
    return user;
  }

  @Query((_) => UserResult)
  async me(@Ctx() { req }: any) {
    if (!req.req.session.user) {
      return new Error({
        message: "you are not logged in",
      });
    }
    const user = await User.findOne({ email: req.req.session.user.email });
    if (!user) {
      return new Error({
        message: "user does not exist",
      });
    }
    return user;
  }
}
