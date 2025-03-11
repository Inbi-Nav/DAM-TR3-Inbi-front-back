# Usar una imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app/backend

# Copiar los archivos de configuración del proyecto
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código del backend
COPY . .

# Exponer el puerto en el que corre la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "app.js"]