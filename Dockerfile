# --- Etapa 1: build ---
FROM node:20-alpine AS builder
WORKDIR /app

# Dependencias
COPY package.json package-lock.json ./
RUN npm ci

# Código + build
COPY . .
RUN npm run build

# --- Etapa 2: runtime mínimo ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Solo lo necesario para correr Next.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
