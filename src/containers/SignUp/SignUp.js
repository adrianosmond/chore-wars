import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { auth } from 'utils/database';
import * as routes from 'constants/routes';
import SignUpForm from 'components/SignUpForm';

const INITIAL_STATE = {
  error: false,
};

class SignUp extends Component {
  state = INITIAL_STATE

  static propTypes = {
    history: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  componentDidMount() {
    const { history } = this.props;
    auth.onAuthStateChanged((authUser) => {
      if (authUser) history.push(routes.NO_GAME);
    });
  }

  onSubmit = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => this.setState({ ...INITIAL_STATE }))
      .catch(error => this.setState({ error: error.message }));
  }

  render() {
    const { error } = this.state;
    return (
      <SignUpForm
        onSubmit={this.onSubmit}
        error={error}
      />
    );
  }
}

export default SignUp;
