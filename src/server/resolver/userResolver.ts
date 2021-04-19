import {
  Query,
  Resolver,
  Ctx,
  Mutation,
  Arg,
  InputType,
  Field,
} from "type-graphql";
import { compareSync } from "bcrypt";
import { User } from "../entity/user";

@InputType()
class UserInput implements Partial<User> {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  handle: string;
  @Field()
  name: string;
}

@InputType()
class LoginInput implements Partial<User> {
  @Field()
  email: string;
  @Field()
  password: string;
}

@Resolver(User)
export class UserResolver {
  @Mutation((_) => User)
  async createAccount(
    @Arg("userInput") userInput: UserInput,
    @Ctx() { req }: any
  ) {
    const user = await new User(
      userInput.handle,
      userInput.email,
      userInput.name,
      userInput.password
    ).save();
    req.req.session.user = user;
    return user;
  }

  @Mutation((_) => User)
  async login(@Arg("loginInput") loginInput: LoginInput, @Ctx() { req }: any) {
    const user = await User.findOne({ email: loginInput.email });
    if (compareSync(loginInput.password, user?.passwordHash ?? "")) {
      req.req.session.user = user;
      return user;
    }
    return null;
  }

  @Mutation((_) => User)
  logout(@Ctx() { req }: any) {
    const user = req.req.session.user;
    delete req.req.session.user;
    return user;
  }

  @Query((_) => User)
  async me(@Ctx() { req }: any) {
    const user = await User.findOne({ email: req.req.session.user.email });
    return user;
  }
}
