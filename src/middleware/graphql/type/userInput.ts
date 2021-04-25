import { InputType, Field } from "type-graphql";
import { User } from "../../../database/entity/user";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;
}
