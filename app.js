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

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views');

let page = {
  title: 'Twitter App',
  people: [
    { name: 'Alex' },
    { name: 'Silvia' },
    { name: 'Mochi' }
  ]
};

nunjucks.configure('views', {noCache: true});
nunjucks.render('index.html', page, function(err, output) {
  console.log(output);
});

app.get('/', function(req, res) {
  res.render( 'index', {title: page.title, people: page.people} );
});

app.use('/:id?', function(req, res, next) {
  if (!req.params.id) console.log(req.method + ' /' + res.statusCode);
  else console.log(req.method + ' /' + req.params.id);
  next();
});

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});
