FROM node:10.8.0-alpine

# Set application folder path
ENV PATH_APP=/app/
RUN mkdir $PATH_APP

# Install dependencies
COPY package*.json $PATH_APP
WORKDIR $PATH_APP
RUN npm install

# Copy necessary files
# WARN: Don't include .eslintrc
# This would break the hot reload module for some reason
COPY ./src $PATH_APP/src
COPY ./public $PATH_APP/public
COPY ./Makefile $PATH_APP/

CMD ["npm", "start"]
