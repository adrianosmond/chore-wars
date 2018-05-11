import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import withAuthorization from '../../components/withAuthorization';

import PointsGraph from '../../components/PointsGraph';
import ChoresList from '../../components/ChoresList';
import Actions from '../../components/Actions';

import { getFilteredChoresArray } from '../../constants/utils';

class Chores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chores: getFilteredChoresArray(props.chores),
    };
  }


  componentWillReceiveProps(newProps) {
    if (newProps.chores !== this.props.chores) {
      this.setState({
        chores: getFilteredChoresArray(newProps.chores),
      });
    }
  }

  render() {
    const { chores } = this.state;
    return (
      <div className="app">
        <PointsGraph />
        <div className="app__chores">
          { chores ? <ChoresList chores={chores} /> : null }
          <Actions />
        </div>
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;
const isLoading = state => !state.pointsLoaded || !state.choresLoaded;

const mapStateToProps = state => ({
  chores: state.chores.present,
});

export default compose(
  withAuthorization(authCondition, isLoading),
  connect(mapStateToProps),
)(Chores);
