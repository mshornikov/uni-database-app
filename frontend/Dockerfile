FROM node:20.11.0 AS node

COPY . /frontend

WORKDIR /frontend

RUN npm i

CMD ["npm", "run", "dev"]

