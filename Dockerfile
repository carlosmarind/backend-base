#primer bloque
FROM node:22 AS build
#primera etapa de construccion.

ARG username=default-docker
WORKDIR /usr/app
COPY . . 
RUN npm install
RUN npm run test
RUN npm run build
ENV USERNAME=$username

#segundo bloque
FROM node:22-alpine
#construir la siguiente etapa - imagen a distribuir

WORKDIR /usr/app
COPY --from=build /usr/app/dist ./dist
COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/package*.json ./

EXPOSE 3001

CMD ["node", "dist/index.js"]