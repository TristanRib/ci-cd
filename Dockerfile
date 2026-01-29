FROM node:20-slim

COPY . /app

WORKDIR /app

RUN rm -rf /app/frontend
RUN npm install --ignore-dev

CMD ["npm", "run", "start:backend"]