import websocket from "@fastify/websocket";
import cors from "@fastify/cors";
import { type FastifyReply, fastify } from "fastify";

export const server = fastify() as any;

await server.register(cors, {
  origin: "*",
});

await server.register(websocket);

server.get("/test", async (res: FastifyReply) => {
  res.code(200).send("yep");
});

try {
  server.listen({ host: "0.0.0.0", port: process.env.PORT });
  console.log("Listening on: " + process.env.PORT);
} catch (err) {
  // TODO: set up sentry
  // sentry.captureException(err);
  server.log.error(err);
  process.exit(1);
}
