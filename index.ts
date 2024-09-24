import websocket from "@fastify/websocket";
import cors from "@fastify/cors";
import { type FastifyReply, type FastifyRequest, fastify } from "fastify";

export const server = fastify() as any;

await server.register(cors, {
  origin: "*",
});

await server.register(websocket);

server.get("/test", async (req: FastifyRequest, res: FastifyReply) => {
  return res.code(200).send({ message: "yep" });
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
