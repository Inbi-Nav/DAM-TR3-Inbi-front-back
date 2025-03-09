# Usamos una imagen oficial de Node.js
FROM node:18-alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de package.json y package-lock.json del backend
COPY backend/package*.json ./backend/

# Instalamos las dependencias del backend
RUN cd backend && npm install

# Copiamos el resto del código del backend
COPY backend/ ./backend/

# Copiamos los archivos de package.json y package-lock.json del frontend
COPY frontend/package*.json ./frontend/

# Instalamos las dependencias del frontend
RUN cd frontend && npm install

# Copiamos el resto del código del frontend
COPY frontend/ ./frontend/

# Exponemos los puertos de la aplicación
EXPOSE 3000 3001

# Comando para iniciar el backend (puedes cambiarlo según tus necesidades)
CMD ["npm", "run", "dev", "--prefix", "backend"]