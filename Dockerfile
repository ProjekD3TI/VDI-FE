# ==========================
# Stage 1 : Build React
# ==========================
FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# ==========================
# Stage 2 : Nginx
# ==========================
FROM nginx:alpine

RUN apk add --no-cache gettext

# Hapus default bawaan nginx (opsional tapi disarankan)
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy hasil build React
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx.conf lokal menjadi default.conf di container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]