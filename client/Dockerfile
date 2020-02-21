FROM node:8 as web-build

WORKDIR /app

COPY package.json /app

RUN npm install

CMD ["npm", "start"]