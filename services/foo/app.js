const express = require('express')
const app = express()
const port = process.env.PORT || 3000

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
