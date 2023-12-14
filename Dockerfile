FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./src ./src

EXPOSE 8000

RUN npm run build

CMD ["node", "dist/src/index.js"]
