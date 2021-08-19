FROM node:10-alpine AS api-server
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
RUN npm install -g create-react-app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm cache clean --force
RUN rm -rf node_modules
RUN npm install
COPY --chown=node:node . .
EXPOSE 3000
CMD [ "npm", "start" ]
