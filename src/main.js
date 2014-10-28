var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var CLIENT_ID = '',
    CLIENT_SECRET = '',
    REDIRECT_URL = 'http://127.0.0.1:4000/oauth2callback';

var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

var scopes = [
    'https://www.googleapis.com/auth/calendar'
];

var oauthUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
    scope: scopes // If you only need one scope you can pass it as string
});

var code;


// 启动服务器，准备回调
var http = require('http'),
    url = require('url');
var server = http.createServer(function (req, res) {
    var request = url.parse(req.url, true);
    if ('\/oauth2callback' === request.pathname) {
        code = request.query.code;
        res.end('OK');
    } else {
        res.end('...')
    }
}).listen(4000, function () {
    // 打开浏览器登录
    var spawn = require('child_process').spawn;
    spawn('open', [oauthUrl]);    
});


var intervalId = setInterval(function () {
    if (code) {
        // 关闭服务器
        server.close();
        // 获取 token
        oauth2Client.getToken(code, function (err, tokens) {
            // Now tokens contains an access_token and an optional refresh_token. Save them.
            if (!err) {
                // TODO: save tokens
                oauth2Client.setCredentials(tokens);
                // TODO: get api
                // https://developers.google.com/google-apps/calendar/v3/reference/
                var calendar = google.calendar({
                    version: 'v3',
                    auth: oauth2Client
                });
                console.log(calendar);
            } else {
                console.log('ERROR:' + err);
            }
        });
        clearInterval(intervalId);
    }
}, 500);

