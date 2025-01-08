FROM node:18-alpine
WORKDIR /usr/index.js
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3001
CMD ["node", "index.js"]
