FROM ubuntu:24.04 AS base

RUN apt-get update && apt-get install -y --no-install-recommends \
  ca-certificates \
  curl \
  gnupg \
  wine \
  && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get install -y nodejs \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

FROM base AS deps
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then npm install -g yarn && yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS runner
ENV NEXT_TELEMETRY_DISABLED=1
ENV DEBIAN_FRONTEND=noninteractive

ENV WINEARCH=win64
ENV WINEPREFIX=/app/.wine
ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY cfg /app/default-cfg/
COPY accServer.exe /app/acc-server/accServer.exe


RUN groupadd -g 1001 appgroup && \
    useradd -u 1001 -g appgroup -m appuser  && \
    echo '#!/bin/bash' > /app/start_node.sh && \
    echo 'node /app/server.js > /app/node.log 2>&1' >> /app/start_node.sh && \
    chmod +x /app/start_node.sh && \
    echo '#!/bin/bash' > /app/start_wine.sh && \
    echo 'cd /app/acc-server' >> /app/start_wine.sh && \
    echo 'wine ./accServer.exe > /app/wine.log 2>&1 &' >> /app/start_wine.sh && \
    chmod +x /app/start_wine.sh && \
    echo '#!/bin/bash' > /app/start.sh && \
    echo 'for file in /app/default-cfg/*.json; do' >> /app/start.sh && \
    echo '  filename=$(basename "$file")' >> /app/start.sh && \
    echo '  if [ ! -f "/app/acc-server/cfg/$filename" ]; then' >> /app/start.sh && \
    echo '    cp "$file" "/app/acc-server/cfg/$filename"' >> /app/start.sh && \
    echo '  fi' >> /app/start.sh && \
    echo 'done' >> /app/start.sh && \
    echo '/app/start_wine.sh' >> /app/start.sh && \
    echo '/app/start_node.sh' >> /app/start.sh && \
    chmod +x /app/start.sh && \
    mkdir /app/log && \
    mkdir /app/acc-server/cfg && \
    chown -R appuser:appgroup /app

USER appuser
RUN wineboot --init 

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["/bin/bash", "/app/start.sh"]
