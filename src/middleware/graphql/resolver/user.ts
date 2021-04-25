import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { compare, hash } from "bcrypt";
import { User } from "../../../database/entity/user";
import { UserInput } from "../type/userInput";
import { LoginInput } from "../type/loginInput";
import { Context } from "../../../types";

@Resolver(User)
export class UserResolver {
  @Query((_) => User, { nullable: true })
  async me(@Ctx() { req }: Context): Promise<Partial<User> | null> {
    if (!req.session.user) {
      return null;
    }
    const user = await User.findOne({ id: req.session.user });
    if (!user) {
      return null;
    }
    return user;
  }
  @Mutation((_) => User, { nullable: true })
  async signup(
    @Arg("data") { email, password, name }: UserInput,
    @Ctx() { req }: Context
  ): Promise<Partial<User> | null> {
    const user = await User.findOne({ email });
    if (user) {
      console.log(JSON.stringify(user, null, 2));
      return null;
    }
    const newUser = new User();
    newUser.email = email;
    newUser.name = name;
    newUser.password = await hash(password, 10);
    const savedUser = await newUser.save();
    req.session.user = savedUser.id;
    return savedUser;
  }
  @Mutation((_) => User, { nullable: true })
  async login(
    @Arg("data") { email, password }: LoginInput,
    @Ctx() { req }: Context
  ): Promise<Partial<User> | null> {
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }
    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      return null;
    }
    req.session.user = user.id;
    return user;
  }
  @Mutation((_) => User, { nullable: true })
  async logout(@Ctx() { req }: Context): Promise<Partial<User> | null> {
    if (!req.session.user) {
      return null;
    }
    const user = await User.findOne({ id: req.session.user });
    if (!user) {
      return null;
    }
    req.session.destroy((err) => err && console.log(err));
    return user;
  }
}
