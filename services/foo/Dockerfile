FROM amazon/aws-lambda-nodejs:14
COPY lambda.js app.js package*.json ./
RUN npm install
CMD [ "lambda.handler" ]
