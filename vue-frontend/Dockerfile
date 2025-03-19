FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN rm -rf node_modules || true

RUN npm install --no-optional

RUN npm install @rollup/rollup-linux-x64-gnu --save-optional

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
