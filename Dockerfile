FROM node:7.10

RUN mkdir -p /usr/api
COPY . /usr/api
WORKDIR /usr/api
RUN apt-get update
RUN apt-get -y install graphicsmagick
RUN npm install --production

ENV PORT 8080
EXPOSE  $PORT

CMD ["npm", "start"]
