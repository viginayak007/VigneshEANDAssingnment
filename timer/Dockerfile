FROM node:14

WORKDIR /timer

COPY /timer/package.json .

RUN npm install

COPY /timer .

EXPOSE 3000

CMD [ "npm", "start" ]