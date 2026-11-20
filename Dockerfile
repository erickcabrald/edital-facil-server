
# Etapa 1: Build
FROM node:22-bookworm-slim AS build

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build


# Etapa 2: Produção
FROM node:22-bookworm-slim AS production

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

COPY --from=build /app/dist ./dist

EXPOSE 10000

CMD ["pnpm", "start"]
