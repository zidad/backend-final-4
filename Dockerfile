FROM node:slim
WORKDIR /app
COPY . /app
RUN npm install
RUN npm install bcrypt
EXPOSE 5000
CMD ["node", "app.js"]