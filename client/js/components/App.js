import React, { PropTypes } from 'react';
import Auth from '../containers/Auth';

const App = ({ isAuth }) => {
  console.log(isAuth);
  // let ctx = isAuth ? (<div>isAuth</div>) : (<Auth />);
  // return (<div>{ctx}</div>);
  return <div>{isAuth}</div>;
};

App.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

export default App;
