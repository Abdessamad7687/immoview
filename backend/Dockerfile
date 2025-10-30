# syntax=docker/dockerfile:1
FROM node:20-alpine AS base
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
COPY src ./src
RUN npm run prisma:generate && npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/generated ./generated
COPY --from=build /app/dist ./dist
COPY package*.json ./

EXPOSE 4000
CMD ["node", "dist/server.js"]


