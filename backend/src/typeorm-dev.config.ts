import { Announcement } from "./entities/Announcement";
import { AnnouncementData } from "./entities/AnnouncementData";
import { createConnection } from "typeorm";
export default {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Announcement, AnnouncementData],
  synchronize: true,
  logging: true,
  maxQueryExecutionTime: 30,
} as Parameters<typeof createConnection>[0];
