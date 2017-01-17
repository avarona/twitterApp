//const http = require('http');
//const server = http.createServer();

// TODO: use chalk library to add color to terminal middleware responses

const PORT = 3000;
const express = require('express');
const app = express();
const volleyball = require('volleyball')

app.use(volleyball);

app.use('/:id?', function(req, res, next) {
  if (!req.params.id) console.log(req.method + ' /' + res.statusCode);
  else console.log(req.method + ' /' + req.params.id);
  next();
});

app.get('/', function(req, res, next) {
  res.send('This appears with a /');
  console.log(req.method + ' /');
  next();
});

// app.use('/news', function(req, res, next) {
//   console.log('news has been hit');
//   res.send('this is the news chain');
//   next();
// });

app.get('/news/:id?', function(req, res, next) {
  res.send('Youve reached the news page' + req.params.id);
  next();
});

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});
