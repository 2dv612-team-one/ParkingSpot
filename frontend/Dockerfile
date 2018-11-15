# TODO: use node alpine instead
FROM node:7

# Set application folder path
ENV PATH_APP=/app
RUN mkdir $PATH_APP

# Install dependencies
COPY package*.json $PATH_APP
WORKDIR $PATH_APP
RUN npm install

COPY . $PATH_APP

CMD ["npm", "start"]
