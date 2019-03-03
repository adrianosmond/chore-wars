import React, { Component } from 'react';
import { auth } from 'utils/database';
import * as routes from 'constants/routes';

import Loading from 'components/Loading';
import LoginForm from 'components/LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.loggedIn();
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  }

  loggedIn = () => {
    const { history } = this.props;
    history.push(routes.CHORES);
  }

  render() {
    const { loading } = this.state;
    return loading ? (
      <Loading />
    ) : (
      <LoginForm loggedIn={this.loggedIn} />
    );
  }
}

export default Login;
