FROM node:20-alpine

WORKDIR /react-vite-app

EXPOSE 80

COPY package.json yarn.lock ./

RUN yarn install --silent

COPY . ./

CMD ["yarn", "run", "dev"]