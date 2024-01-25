FROM node:20.11.0 AS node

COPY . /api

WORKDIR /api

RUN npm i

CMD ["node", "server.js"]
