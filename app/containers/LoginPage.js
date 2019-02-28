// @flow
import React, { Component } from 'react';
import Login from '../components/Login';

type Props = {};

export default class LoginPage extends Component<Props> {
  props: Props;

  render() {
    return <Login />;
  }
}
/*
function mapStateToProps(state) {
  return {
    login: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);*/
