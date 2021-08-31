FROM amazon/aws-lambda-nodejs:14
COPY . .
RUN npm install
RUN npx tsc
RUN ls
CMD [ "lambda.handler" ]
