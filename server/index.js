'use strict';

var koa = require('koa');
var serve = require('koa-static');
var router = require('koa-router');
var mount = require('koa-mount');
var bodyParser = require('koa-bodyparser');
var koaqs = require('koa-qs');
var session = require('koa-session');
var accesslog = require('koa-accesslog');

var Grant = require('grant-koa');
var grant = new Grant(require('./config/grant.json'));;

var app = koa();
app.use(accesslog());

// static
app.use(serve('client'));

// grant - OAuth middleware
app.keys = ['secret', 'key'];
app.use(mount(grant));
app.use(bodyParser());
app.use(session(app));

app.use(router(app));
koaqs(app);

app.get('/handle_facebook_callback', function * (next) {
  console.log(this.query);
  this.body = JSON.stringify(this.query, null, 2);
});

app.get('/handle_twitter_callback', function * (next) {
  console.log(this.query);
  this.body = JSON.stringify(this.query, null, 2);
});

app.listen(4000, function() {
  console.log('Koa server listening on port ' + 4000);
});