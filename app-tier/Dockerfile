
FROM node:alpine
WORKDIR /app
COPY ./package*.json /
# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
# RUN source ~/.bashrc
RUN npm install 16
# RUN npm use 16
COPY . .
CMD node index.js
