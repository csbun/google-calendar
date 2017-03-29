import { connect } from 'react-redux';
import App from '../components/App';

console.log(App);

// const mapStateToProps = state => ({
//   isAuth: state.auth && state.auth.token,
// });
const mapStateToProps = state => {
  console.log(state);
  return {
    isAuth: state.auth && state.auth.token,
  };
};

const mapDispatchToProps = () => ({});

const ifAuth = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ifAuth;
