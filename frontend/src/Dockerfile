FROM node:16

WORKDIR /barebones

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5050

ENV EXPRESS_URL http://localhost:5050

CMD ["npm", "start"]