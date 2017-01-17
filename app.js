//const http = require('http');
//const server = http.createServer();

// TODO: use chalk library to add color to terminal middleware responses

const PORT = 3000;
const express = require('express');
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');
const routes = require('./routes/');
const app = express();

app.use(volleyball);
app.use('/', routes);
app.use(express.static('public'));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});
