import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  Entity,
} from "typeorm";
import { AnnouncementData } from "./AnnouncementData";

@ObjectType()
@Entity()
export class Announcement extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text", { nullable: false, unique: true })
  url: string;

  @Field()
  @Column("varchar", { nullable: true })
  name: string;

  @Column("text", { nullable: true })
  description: string | null;

  @Field()
  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @OneToMany(() => AnnouncementData, (announcementId) => announcementId.id)
  announcementDatas: AnnouncementData[];
}
