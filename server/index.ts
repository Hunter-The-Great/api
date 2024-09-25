import websocket from "@fastify/websocket";
import cors from "@fastify/cors";
import { fastify, type FastifyReply, type FastifyRequest } from "fastify";
import type { FastifyRequestType } from "fastify/types/type-provider";
import { z, ZodSchema } from "zod";

export const server = fastify();

function useSchema<T extends ZodSchema>(
  schema: T,
  handler: (
    req: FastifyRequestType<unknown, unknown, unknown, z.infer<T>>,
    res: FastifyReply,
  ) => void,
) {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const result = schema.safeParse(req.body);
    if (result.error) {
      return res.code(400).send(result.error);
    }
    return handler(req, res);
  };
}
const start = async () => {
  await server.register(cors, {
    origin: "*",
  });

  await server.register(websocket);

  server.get("/test", async (req, res) => {
    return res.code(200).send({ message: "yep" });
  });

  const ceasarSchema = z.object({
    message: z.string(),
  });
  server.post(
    "/ceasar",
    useSchema(ceasarSchema, async (req, res) => {
      const { message } = req.body;
      const messages = [];
      for (let i = 0; i < 26; i++) {
        const result = message
          .split("")
          .map((char) => {
            const code = char.charCodeAt(0);
            if (code >= 65 && code <= 90) {
              return String.fromCharCode(((code - 65 + i) % 26) + 65);
            } else if (code >= 97 && code <= 122) {
              return String.fromCharCode(((code - 97 + i) % 26) + 97);
            } else {
              return char;
            }
          })
          .join("");
        messages.push({ shift: { pos: i, neg: 26 - i }, result });
      }
      return res.code(200).send(messages);
    }),
  );

  try {
    server.listen({ host: "0.0.0.0", port: parseInt(process.env.PORT!) });
    console.log("Listening on: " + process.env.PORT);
  } catch (err) {
    // TODO: set up sentry
    // sentry.captureException(err);
    server.log.error(err);
    process.exit(1);
  }
};
export { start };
