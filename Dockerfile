FROM node:20-alpine

WORKDIR /react-vite-app

EXPOSE 3000

COPY package.json yarn.lock ./

RUN yarn install --silent

COPY . ./

CMD ["yarn", "run", "dev"]