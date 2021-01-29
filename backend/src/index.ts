import "dotenv/config";

import { createConnection } from "typeorm";
import ormconfig from "./typeorm-dev.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { AnnouncementResolver } from "./resolvers/announcement";
import { cronGetPriceForActiveAnnouncements } from "./utils/cron";

//import { AnnouncementResolver } from "./resolvers/announcement";

const main = async () => {
  const conn = await createConnection(ormconfig);
  await conn.runMigrations();
  const app = express();
  await cronGetPriceForActiveAnnouncements();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, AnnouncementResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });
  apolloServer.applyMiddleware({
    app,
  });
  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};
main().catch((err) => {
  console.error(err);
});
