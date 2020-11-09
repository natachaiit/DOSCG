FROM node:alpine

WORKDIR /usr/app
COPY ./api/package.json ./
RUN npm install
COPY ./api/ ./ 

CMD ["npm","start"]