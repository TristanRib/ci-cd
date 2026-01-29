FROM node:20-slim

COPY . /app

WORKDIR /app

RUN npm install --ignore-dev

CMD ["npm", "run", "start:backend"]