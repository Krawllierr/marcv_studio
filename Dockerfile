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

# Build-time args (Easypanel passes these). Next.js inlines NEXT_PUBLIC_* into the client bundle.
ARG NEXT_PUBLIC_FORM_WEBHOOK_URL
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_FORM_WEBHOOK_URL=$NEXT_PUBLIC_FORM_WEBHOOK_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

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

# Same start path as local (start-server.js reads PORT, spawns Next). Echo so we see logs immediately.
CMD ["sh", "-c", "echo '[marcv] starting...' >&2 && exec node scripts/start-server.js"]
