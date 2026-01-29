FROM node:25-slim

COPY . /app

WORKDIR /app

RUN npm install

CMD ["npm", "run", "start:backend"]