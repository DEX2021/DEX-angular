FROM node:14-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY . /usr/src/app
RUN npm i

ENV PORT 3000
EXPOSE 3000

CMD ["npm", "start"]