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

module.exports = function (refresh) {
    // 有 tokens 且没过期则可以直接操作
    if (!refresh && TOKENS && TOKENS.access_token && TOKENS.expiry_date > new Date()) {
        oauth2Client.setCredentials(TOKENS);
        return oauth2Client;
    } else {
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
            if (CONFIG.SERVER_PATH === request.pathname) {
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
                console.log('[success] press Ctrl+C to continue');
                clearInterval(intervalId);
            }
        }, 500);
    }
};
