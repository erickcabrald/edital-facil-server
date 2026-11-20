
# Etapa 1: Build
FROM node:22-bookworm-slim AS build

WORKDIR /app

# Instala o pnpm
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

# Copia os arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instala todas as dependências
RUN pnpm install --frozen-lockfile

# Copia o restante do projeto
COPY . .

# Compila o TypeScript
RUN pnpm build


# Etapa 2: Produção
FROM node:22-bookworm-slim AS production

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml ./

# Instala somente dependências de produção
RUN pnpm install --prod --frozen-lockfile

# Copia os arquivos compilados
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["pnpm", "start"]
