# Pre-built on CI runner — no npm ci / npm run build in Docker
FROM node:22.13.1-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Tools for Secrets Manager fetch
RUN apt-get update \
  && apt-get install -y --no-install-recommends awscli jq ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Non-root user
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copy pre-built Next.js standalone output (built on CI runner)
COPY public ./public
COPY --chown=nextjs:nodejs .next/standalone ./
COPY --chown=nextjs:nodejs .next/static ./.next/static

# Entrypoint that pulls secrets, exports env, then starts server
COPY --chown=nextjs:nodejs ops/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["/entrypoint.sh"]
