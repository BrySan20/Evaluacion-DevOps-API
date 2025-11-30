# Usamos una imagen ligera de Node
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiamos archivos de dependencias
COPY package.json package-lock.json ./

# Instalamos solo dependencias de producción
RUN npm install --omit=dev

# Copiamos el resto del código
COPY . .

# Exponemos el puerto interno de la app
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]