import websocket from "@fastify/websocket";
import cors from "@fastify/cors";
import { fastify } from "fastify";

export const server = fastify();

await server.register(cors, {
  origin: "*",
});

await server.register(websocket);

server.get("/test", async (req, res) => {
  return res.code(200).send({ message: "yep" });
});

try {
  server.listen({ host: "0.0.0.0", port: parseInt(process.env.PORT!) });
  console.log("Listening on: " + process.env.PORT);
} catch (err) {
  // TODO: set up sentry
  // sentry.captureException(err);
  server.log.error(err);
  process.exit(1);
}
