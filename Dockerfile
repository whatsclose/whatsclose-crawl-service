FROM node:6.11.4

# Create db directory
WORKDIR /var/whatsclose-data/crawl-db

# Create app directory
WORKDIR /home/node/app



#RUN yarn

EXPOSE 8888

USER node

CMD [ "npm", "start" ]
