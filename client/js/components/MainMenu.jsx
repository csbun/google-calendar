'use strict';

var React = require('react');
var mui = require('material-ui');

var globalActions = require('../actions/globalActions');

var { Toolbar, IconButton } = mui;


class MainMenu extends React.Component {
  openNav() {
    globalActions.openNav();
  }
  render() {
    return (
      <Toolbar>
        <IconButton
          iconClassName="fa fa-bars"
          tooltip="toggle menu"
          onClick={this.openNav}
        />
      </Toolbar>
    );
  }
};

module.exports = MainMenu;