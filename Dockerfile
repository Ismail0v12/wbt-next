FROM node:16.17.0

WORKDIR /frontend

COPY ./package.json .

RUN yarn install

COPY . .

RUN yarn build

CMD ["yarn", "start"]
