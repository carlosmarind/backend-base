FROM node:alpine3.20

WORKDIR /usr/app

COPY ./node_modules ./node_modules
COPY ./dist ./dist
COPY ./package*.json ./

EXPOSE 3001

CMD ["node", "dist/index.js"]