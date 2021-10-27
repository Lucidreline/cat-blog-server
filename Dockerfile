FROM node:15 AS production

WORKDIR /app

COPY package*.json ./

RUN npm i --only=prod

COPY ./ ./

RUN npm run build

CMD ["node", "dist/main"]