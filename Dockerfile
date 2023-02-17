FROM node:lts-alpine
ENV NODE_ENV=production
ENV DB_USER=grupo19
ENV DB_PASSWORD='eQ@>z#lQ<CSQ1@/x'
ENV DB_NAME=pf-ecommerce
ENV DB_HOST=/cloudsql/pueba3:us-central1:pf-ecommerce-database
ENV DATABASE_URL=postgres://postgres:Uamicasa12@host.docker.internal:5432/tercerpf
ENV MPAGOTOKEN=APP_USR-6070243157153859-112816-2dfaecd86b8dc78027ee27ae992701f8-1250188653
WORKDIR /usr/src/app/api
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 8080
USER node
CMD ["npm", "start"]