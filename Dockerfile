# base image
FROM node:12.2.0

# set working folder
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN yarn install

# add app
COPY . /app

# start app
CMD yarn start 
