FROM node:lts-alpine
ENV NODE_ENV=production
ENV DATABASE_URL='postgres://betubtxz:gd3CyKntwjSH7geyLOKzNGL_zUsge7A_@otto.db.elephantsql.com/betubtxz'
ENV DB_USER='grupo19'
ENV DB_PASSWORD='eQ@>z#lQ<CSQ1@/x'
ENV DB_NAME='pf-ecommerce'
ENV DB_HOST='/cloudsql/pueba3:us-central1:pf-ecommerce-database/'
WORKDIR /usr/src/app/api
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 8080
USER node
CMD ["npm", "start"]
