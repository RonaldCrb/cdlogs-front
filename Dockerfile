# Imagen base para todos los stages
# solo se incluyen las dependencias de produccion
# no se incluye el codigo todavia

# Usamos imagen de Node version LTS con linux Alpine
FROM node:lts-alpine AS base

# this env var sets the parameters for main api url running in alpine containers
ENV DOCKERIZED true
ENV HOST 0.0.0.0

# instalamos tini para controlar la terminacion del proceso
RUN apk add --no-cache tini curl
  
# establecemos el directorio de uso
WORKDIR /app

# copiamos los archivos de dependencias
COPY package*.json ./

# instalamos dependencias primero
RUN npm install && npm cache clean --force

# colocamos variable de entorno
ENV PATH /app/node_modules/.bin/:$PATH

# imagen de produccion y build
# no copiamos codigo porque luego se vincula
# como bind mount

# usamos la imagen que acabamos de crear como base
FROM base AS dev
# asignamos variable de entorno de nodeJS
ENV NODE_ENV="development"
# instalamos dependencias de desarrollo
RUN npm install
# asignamos tini al entrypoint
ENTRYPOINT ["tini", "--"]
# ejecutamos nodemon desde la carpeta node_modules
CMD ["npm", "run", "dev"]

# imagen de build

FROM dev AS build
COPY . .
RUN npm run build

# image de produccion 
FROM base as prod
ENV NODE_ENV="production"
COPY --from=build /app/. /app/.
CMD ["npm", "start"]