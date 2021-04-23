import { InputType, Field } from "type-graphql";
import { User } from "../entity/user";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  handle: string;
  @Field()
  name: string;
}
