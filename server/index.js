'use strict';

var koa = require('koa');
var serve = require('koa-static');
var router = require('koa-router');
var bodyParser = require('koa-bodyparser');
var koaqs = require('koa-qs');
var session = require('koa-session');
var accesslog = require('koa-accesslog');




var app = koa();
app.use(accesslog());


app.use(bodyParser());
app.use(session(app));
app.use(router(app));
koaqs(app);

// oauth
app.use(require('./oauth')(app));

// static
app.use(serve('client'));

// apis
require('./api').init(app);


app.listen(4000, function() {
  console.log('Koa server listening on port ' + 4000);
});
