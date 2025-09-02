# Base image: match your local Node version
FROM node:24.6.0-bullseye AS base

WORKDIR /app

# -------------------------
# Stage 1: Dependencies
# -------------------------
FROM base AS deps

# Upgrade npm to match local version
RUN npm install -g npm@11.5.2

WORKDIR /app

# Copy only package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Rebuild sharp with scripts enabled (important!)
RUN npm rebuild sharp --arch=x64 --platform=linux --libc=glibc


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
RUN npm run build:fast

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
ARG PAYLOAD_SECRET
ARG PREVIEW_SECRET
ARG R2_ACCESS_KEY_ID
ARG R2_SECRET_ACCESS_KEY
ARG R2_BUCKET
ARG R2_ENDPOINT
ARG CF_ACCOUNT_ID
ARG CF_API_TOKEN
ARG NEXT_PUBLIC_TURNSTILE_KEY
ARG TURNSTILE_SECRET
ARG NEXT_PUBLIC_PUBLIC_KEY
ARG NEXT_PUBLIC_URL_ENDPOINT
ARG PRIVATE_KEY
ARG RESEND_API_KEY
ARG SPOTIFY_CLIENT_ID
ARG SPOTIFY_CLIENT_SECRET
ARG SPOTIFY_REFRESH_TOKEN
ARG NEXT_PUBLIC_AUTHOR_NAME
ARG NEXT_PUBLIC_SITE_NAME
ARG NEXT_PUBLIC_CONTACT_EMAIL
ARG NEXT_TELEMETRY_DISABLED

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
