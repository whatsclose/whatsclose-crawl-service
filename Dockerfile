FROM node:6.11.4

# Create app directory
WORKDIR /home/node/app

VOLUME /home/node/app

#RUN yarn

EXPOSE 8888

USER node

CMD [ "npm", "start" ]
