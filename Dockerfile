FROM node:16

COPY ./ /brogue/

WORKDIR /brogue/server

RUN npm i

CMD npm start