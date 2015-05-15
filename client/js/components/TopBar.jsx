'use strict';

var React = require('react');
var mui = require('material-ui');

var globalActions = require('../actions/globalActions');

var { Toolbar, IconButton } = mui;

class TopBar extends React.Component {
  openNav() {
    globalActions.openNav();
  }
  render() {
    return (
      <Toolbar>
        <IconButton
          iconClassName="fa fa-bars"
          tooltip="toggle menu"
          onClick={this.props.onLeftIconButtonClick}
        />
      </Toolbar>
    );
  }
}

Toolbar.PropTypes = {
  onLeftIconButtonClick: React.PropTypes.func.isRequired
};

module.exports = TopBar;
