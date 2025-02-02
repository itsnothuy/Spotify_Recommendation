FROM --platform=linux/amd64 node:18-alpine
WORKDIR /usr/index.js
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3001

# Add a health check
HEALTHCHECK CMD curl --fail http://localhost:3001/health || exit 1

CMD ["node", "index.js"]
