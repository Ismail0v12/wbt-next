FROM node:latest

RUN mkdir /frontend

WORKDIR /frontend

COPY ./package.json /frontend

RUN yarn install

COPY . /frontend

RUN yarn build

CMD ["yarn", "start"]
