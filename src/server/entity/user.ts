import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import bcrypt from "bcrypt";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryColumn()
  handle: string;
  @Field()
  @Column()
  email: string;
  @Field()
  @Column()
  name: string;
  @Column()
  passwordHash: string;

  constructor(handle: string, email: string, name: string, password: string) {
    super();
    this.handle = handle;
    this.email = email;
    this.name = name;
    this.passwordHash = this.hash(password);
  }

  hash(password: string) {
    return bcrypt.hashSync(password ?? "", 10);
    // return password;
  }
}
