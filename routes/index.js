const express = require('express');
const tweetBank = require('../tweetBank');

const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

// let page = {
//   title: 'Twitter App',
//   people: [
//     { name: 'Alex' },
//     { name: 'Silvia' },
//     { name: 'Mochi' }
//   ]
// };

router.get('/', function (req, res, next) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets, showForm: true, username: req.params.username } );
});

router.get('/users/:name', function(req, res) {
  let name = req.params.name;
  let list = tweetBank.find( {name: name} );
  res.render( 'index', { tweets: list } );
});

router.get('/tweets/:id', function(req, res) {
  let id = req.params.id;
  let list = tweetBank.find( {id: id} );
  res.render( 'index', { tweets: list } );
});

router.post('/tweets', urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

router.use('/:id?', function(req, res, next) {
  if (!req.params.id) console.log(req.method + ' /' + res.statusCode);
  else console.log(req.method + ' /' + req.params.id);
  next();
});

// router.get('/stylesheets/style.css', function(req, res) {
//   res.sendFile('/public/stylesheets/style.css', {root: __dirname + "/.."});
// });

module.exports = router;