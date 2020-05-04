#build
FROM node:12.14.1-alpine as build
#creates a dir in docker
WORKDIR /app

#add node modules
ENV PATH /app/node_modules/.bin:$PATH

#you get it
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

CMD ["npm", "start"]

#need to copy build now and do something with that image

