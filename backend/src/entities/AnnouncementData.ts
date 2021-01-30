import { Field, ObjectType, Int } from "type-graphql";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
} from "typeorm";
import { Announcement } from "./Announcement";
@ObjectType()
@Entity()
export class AnnouncementData extends BaseEntity {
  // static validations = {
  //     price: is.required()
  // };
  @Field(() => Int, { name: "details_id" })
  @PrimaryGeneratedColumn()
  details_id: number;

  @Field({ nullable: true })
  @Column("decimal", { precision: 9, scale: 2, nullable: false })
  price: number;

  @Field()
  @CreateDateColumn({ type: "timestamp" })
  details_createdAt: Date;

  @ManyToOne(() => Announcement, (announcement) => announcement.id)
  announcement?: number;
  //Announcement[];
}
