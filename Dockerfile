# Base image: match your local Node version
FROM node:24.6.0-alpine AS base

# Install minimal dependencies for Alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

# -------------------------
# Stage 1: Dependencies
# -------------------------
FROM base AS deps

# Upgrade npm to match local version
RUN npm install -g npm@11.5.2

WORKDIR /app

# Copy only package files and install dependencies
COPY package.json package-lock.json ./
ENV npm_config_ignore_scripts=true
RUN npm ci --legacy-peer-deps


# -------------------------
# Stage 2: Build
# -------------------------
FROM base AS builder

WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all source files
COPY . .

# Build Next.js
RUN npm run build

# -------------------------
# Stage 3: Runner / Production
# -------------------------
FROM base AS runner

WORKDIR /app

# Production environment
ENV NODE_ENV=production
ENV PORT=3000

# Optional: environment variables
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_SERVER_URL
ARG DATABASE_URI

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built assets
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Prepare prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Run the standalone server
CMD ["node", "server.js"]
