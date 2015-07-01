'use strict';

var Reflux = require('reflux');

var eventTypes = [{
    payload: '0', // colorId
    background: '#9fc6e7',
    foreground: '#1d1d1d',
    text: '编码' // 默认
  // }, {
  //   payload: '1',
  //   background: '#a4bdfc',
  //   foreground: '#1d1d1d',
  //   text: '类型 1'
  }, {
    payload: '2',
    background: '#7ae7bf',
    foreground: '#1d1d1d',
    text: '学习'
  }, {
    payload: '3',
    background: '#dbadff',
    foreground: '#1d1d1d',
    text: '处理故障'
  // }, {
  //   payload: '4',
  //   background: '#ff887c',
  //   foreground: '#1d1d1d',
  //   text: '类型 4'
  }, {
    payload: '5',
    background: '#fbd75b',
    foreground: '#1d1d1d',
    text: '会议'
  }, {
    payload: '6',
    background: '#ffb878',
    foreground: '#1d1d1d',
    text: '处理文档'
  // }, {
  //   payload: '7',
  //   background: '#46d6db',
  //   foreground: '#1d1d1d',
  //   text: '类型 7'
  }, {
    payload: '8',
    background: '#e1e1e1',
    foreground: '#1d1d1d',
    text: '其他'
  // }, {
  //   payload: '9',
  //   background: '#5484ed',
  //   foreground: '#1d1d1d',
  //   text: '类型 9'
  }, {
    payload: '10',
    background: '#51b749',
    foreground: '#1d1d1d',
    text: '新人指引'
  // }, {
  //   payload: '11',
  //   background: '#dc2127',
  //   foreground: '#1d1d1d',
  //   text: '类型 11'
  }];

module.exports = Reflux.createStore({
  getInitialState: function () {
    return eventTypes;
  },
  /**
   * 根据 payload 查找
   */
  find: function (payload) {
    for (let item of eventTypes) {
      if (item.payload === payload) {
        return item;
      }
    }
    return eventTypes[0];
  }
});
