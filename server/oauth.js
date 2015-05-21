'use strict';


// Google Oauth
// https://developers.google.com/google-apps/calendar/quickstart/node
var googleAuth = require('google-auth-library');
var CONFIG = require('./config/oauth.json');

// gapi.client.setApiKey('AIzaSyCIT95PyeaY6JAHeftgYPlGplT56UhuFbI');

var auth = new googleAuth();
var oauth2Client = new auth.OAuth2(
  CONFIG.CLIENT_ID,
  CONFIG.CLIENT_SECRET,
  'http://127.0.0.1:4000/oauth2callback'
);

// 内存版 token
var memTokenObj;
function setToken(newToken) {
  oauth2Client.credentials = newToken;
  memTokenObj = newToken;
}
function getToken() {
  return memTokenObj;
}
// end of memTokenObj


var googleOauth = function (app) {
  /**
   * google 登录回调地址
   */
  app.get('/oauth2callback', function * () {
    var code = (this.query || '').code || '';
    // 使用 es6 的 Promise 封装 oauth2Client.getToken，使之可以 yield
    var promise = new Promise(function (resolve, reject) {
      // 获取 token
      oauth2Client.getToken(code, function (err, tokens) {
        if (err) {
          console.error(err);
          // promise 失败
          reject(err);
        } else {
          // 获得 token 则保存
          setToken(tokens);
          // promise 成功
          resolve(tokens);
        }
      });
    });

    // 运行 promise
    var that = this;
    yield promise.then(function () {
      // 成功则跳转到之前 state 记录的地址
      that.redirect(that.query.state);
    }).catch(function (err) {
      // 失败则输出 error
      that.body = err;
    });

  });

  /**
   * 返回一个方法，用于检查 Oauth
   */
  return function * (next) {
    // 检查 token
    var tokenObj = getToken();
    if (tokenObj && tokenObj.access_token && tokenObj.expiry_date > new Date()) {
      // 有 tokens 且没过期则可以直接操作
      oauth2Client.credentials = tokenObj;
      yield next;
    } else {
      // 没有期限内的 token 则重定向到 google OAuth2 地址
      var oauthUrl = oauth2Client.generateAuthUrl({
        'access_type': 'offline', // 'online' (default) or 'offline' (gets refresh_token)
        scope: [
          'https://www.googleapis.com/auth/calendar.readonly',
          // 'https://www.googleapis.com/auth/calendar'
        ]
      });
      // state 带上当前的地址
      this.redirect(oauthUrl + '&state=' + encodeURIComponent(this.url));
    }
  };

};

/**
 * 暴露一个方法
 * 获取 oauth2Client
 */
googleOauth.getClient = function () {
  return oauth2Client;
};

module.exports = googleOauth;
