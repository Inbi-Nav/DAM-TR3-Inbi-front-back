FROM node:18-alpine

WORKDIR /app

COPY backend/package*.json ./backend/

RUN cd backend && npm install

COPY backend/ ./backend/

COPY frontend/package*.json ./frontend/

RUN cd frontend && npm install

COPY frontend/ ./frontend/

EXPOSE 3000 3001

CMD ["nodemon", "--legacy-watch", "node_modules/.bin/vue-cli-service", "serve", "--host", "0.0.0.0"]