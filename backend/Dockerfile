FROM node:18-alpine

RUN apk add --no-cache make gcc g++ python3

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]