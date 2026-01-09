FROM debian:13-slim

RUN apt-get update && apt-get clean

RUN npm install

CMD ["npm", "run", "start"]