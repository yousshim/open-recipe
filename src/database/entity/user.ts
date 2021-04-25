import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  PrimaryColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @PrimaryColumn()
  email: string;

  @Field()
  @Column()
  name: string;

  @Column()
  password: string;
}
