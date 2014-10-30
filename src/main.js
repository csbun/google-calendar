#!/usr/bin/env node
'use strict';

// 参数
var director = process.argv[2] || '',
    params = process.argv[3];


var calendar = require('./calendar');

calendar[director]();
