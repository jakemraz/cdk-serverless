const express = require('express')
const app = express()
const port = process.env.PORT || 3000



// TODO : Separate middleware and run only when lambda runtime.
const authMiddleware = (req, res, next)  => {

  const { getCurrentInvoke } = require('@vendia/serverless-express');
  const { event = {} } = getCurrentInvoke();
  req.claims = event.requestContext.authorizer.jwt.claims;

  next();
}

app.use(authMiddleware);

app.get('/', (req, res) => {
  console.log('GET /');
  console.log(req);
  res.status(200).json({
    foo: 'GET /',
  });
});

app.post('/', (req, res) => {
  console.log('POST /');
  console.log(req);
  res.status(200).json({
    foo: 'POST /',
  });
});

app.all('/hello', (req, res) => {
  console.log(`${req.method} /hello`);
  console.log(req);
  res.status(200).json({
    foo: `${req.method} /hello`,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

exports.app = app;
