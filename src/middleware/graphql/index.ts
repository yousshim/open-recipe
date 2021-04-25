import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { Request, Response } from "express";
import { UserResolver } from "./resolver/user";

export async function buildGraphQlMiddleware() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });
  const server = new ApolloServer({
    schema,
    context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }),
  });
  return server.getMiddleware();
}
