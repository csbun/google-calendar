'use strict';

const koa = require('koa');
const serve = require('koa-static');
// var bodyParser = require('koa-bodyparser');
// var koaqs = require('koa-qs');
// var session = require('koa-session');
// var accesslog = require('koa-accesslog');
//
//
const app = koa();
// app.use(accesslog());
// app.use(bodyParser());
// app.use(session(app));
// koaqs(app);
//
// // oauth
// app.use(require('./oauth')(app));

// static
app.use(serve('client'));

// // apis
// app.use(require('./api'));
//
//

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Koa server listening on port ${PORT}`));
