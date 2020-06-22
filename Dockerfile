# #build -- pulls image from docker hub
# FROM node:12.14.1-alpine as build
# #creates a dir in docker
# WORKDIR /app

# #you get it
# COPY package.json .
# # COPY package-lock.json .
# ENV PATH /app/node_modules/.bin:$PATH
# RUN npm install
# COPY . .
# RUN npm run build

# #pull nginx image
FROM nginx:1.15
# #place build in nginx folder
EXPOSE 80

COPY /build/ /usr/share/nginx/html
# #this line removes default config and replaces with the one I made
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf


#need to copy build now and do something with that image
#use ngnix for this

