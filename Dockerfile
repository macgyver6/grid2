FROM node:7.9-alpine

COPY ./* /usr/src/app/

WORKDIR /usr/src/app
CMD [ "npm", "start" ]

EXPOSE 3000
