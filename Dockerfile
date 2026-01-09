FROM node:25-slim

WORKDIR /app

COPY . .
RUN npm install

CMD ["npm", "run", "start"]