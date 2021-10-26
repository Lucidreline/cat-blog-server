FROM node:15

WORKDIR /app

COPY package.json .

RUN npm i

RUN apt-get update 

COPY . ./

CMD ["node", "server.js"]