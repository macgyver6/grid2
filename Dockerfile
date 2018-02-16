FROM node:7.9-alpine

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY . /usr/src/app

CMD [ "npm", "start" ]

# replace this with your application's default port
EXPOSE 3000
