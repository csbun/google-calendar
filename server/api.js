'use strict';


// var oauth = require('./oauth');

exports.init = function (app) {
  app.get('/index', function * (next) {
    console.log('index');
    this.body = 'index';
    yield next;
  });
};
