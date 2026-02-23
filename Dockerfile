# MarcV Studio - Next.js production (Easypanel)
# Port 3002 default; override with PORT env.

# ---- Dependencies ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- Build ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- Production ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=80

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/app ./app
COPY --from=builder /app/components ./components
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/public ./public
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.js ./

EXPOSE 80

# One line to stderr so we see runtime logs; then exec Next (stay foreground)
CMD ["sh", "-c", "echo '[marcv] container started, starting Next...' >&2 && exec node node_modules/next/dist/bin/next start -H 0.0.0.0 -p 80"]
