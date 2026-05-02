# syntax=docker/dockerfile:1

FROM node:24-alpine AS build

WORKDIR /app
ENV CI=true

RUN corepack enable && corepack prepare pnpm@10.33.2 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .
RUN pnpm exec panda codegen && pnpm run build

FROM nginxinc/nginx-unprivileged:1.27-alpine AS production

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
