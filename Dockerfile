FROM node:22

ARG username=default-docker
WORKDIR /usr/app

COPY . . 

RUN npm install

RUN npm run test

RUN npm run build

ENV USERNAME=$username

CMD ["node", "dist/index.js"]