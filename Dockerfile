FROM node:7.9-alpine

COPY . /usr/src/app/

WORKDIR /usr/src/app
RUN npm install

CMD [ "npm", "start" ]

EXPOSE 3000
