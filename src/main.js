var fs = require('fs');

// Google
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

// 读取配置
var CONFIG = require('./config.json');
var TOKENS = require('./tokens.json');

var oauth2Client = new OAuth2(
    CONFIG.CLIENT_ID,
    CONFIG.CLIENT_SECRET,
    'http://127.0.0.1:' + CONFIG.SERVER_PORT + CONFIG.SERVER_PATH
);

// 有 tokens 则可以直接操作
if (TOKENS && TOKENS.access_token) {
    oauth2Client.setCredentials(TOKENS);
    var calendar = google.calendar({
        version: 'v3',
        auth: oauth2Client
    });
    // TODO: get api
    // https://developers.google.com/google-apps/calendar/v3/reference/
    // calendar.calendarList.list(function (err, response) {
    //     console.log(response);
    // });
    calendar.events.list({
        calendarId: 'icsbun@gmail.com',
        // timeMin: (new Date()) - 1000*60*60*24*3,
        // timeMax: (new Date()) - 1000*60*60*24*100,
        maxResults: 10
    }, function (err, response) {
        console.log(response);
    });
} else {
    // 
    var oauthUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
        scope: [
            'https://www.googleapis.com/auth/calendar'
        ]
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
    }).listen(CONFIG.SERVER_PORT, function () {
        // 打开浏览器登录
        require('child_process').spawn('open', [oauthUrl]);
        console.log('waiting OAuth2...');
    });

    // 定时检查是否获得 code
    var intervalId = setInterval(function () {
        if (code) {
            // 关闭服务器
            server.close();
            // 获取 token
            oauth2Client.getToken(code, function (err, tokens) {
                if (!err) {
                    fs.writeFileSync('./tokens.json', JSON.stringify(tokens));
                } else {
                    console.log('ERROR:' + err);
                }
            });
            console.log('[success] press Ctrl+C to continual');
            clearInterval(intervalId);
        }
    }, 500);
}

