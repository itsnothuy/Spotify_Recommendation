# 1. Build stage
FROM node:18-alpine AS builder
WORKDIR /app
# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Build the Next.js application
RUN npm run build


# 2. Production stage
FROM node:18-alpine
WORKDIR /app
# Copy build artifacts and dependencies from the builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/tailwind.config.mjs ./
COPY --from=builder /app/postcss.config.mjs ./
COPY --from=builder /app/src/app/globals.css ./globals.css

# Install production dependencies
RUN npm install --production

# Expose application port
EXPOSE 3000

# Start the application
ENV NODE_ENV=production
CMD ["npm", "start"]
