# pull official base image
FROM node:16.9.1-alpine3.14

# set working directory
WORKDIR /reactapp

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# add app
COPY . ./

# start app
RUN npm run build
RUN npm install -g serve
CMD [ "serve", "-s", "build" ]