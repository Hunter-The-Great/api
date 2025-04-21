FROM oven/bun:latest AS base

RUN mkdir -p /bot
WORKDIR /bot

COPY package.json .
COPY bun.lockb .
RUN bun install
RUN apt-get update -y && apt-get install -y openssl

COPY . .

RUN bun run db-gen

CMD ["bun", "run", "start"]
