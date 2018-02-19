import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fecha from 'fecha';

import * as routes from '../../constants/routes';
import { makeSlug } from '../../constants/utils';

class ChoreForm extends Component {
  constructor(props) {
    super(props);

    const { chore } = props;

    this.state = {
      ...chore,
      slug: makeSlug(chore.title),
      doneDate: fecha.format(chore.lastDone, 'YYYY-MM-DD'),
      error: null,
    };
  }

  onSubmit(event) {
    event.preventDefault();

    if (!this.formIsValid()) return false;

    const {
      doneDate,
      error,
      slug,
      ...chore
    } = this.state;

    chore.frequency = parseInt(this.state.frequency, 10);
    chore.pointsPerTime = parseInt(this.state.pointsPerTime, 10);

    this.props.onSubmit(chore, slug);
    return false;
  }

  formIsValid() {
    if (this.state.title.trim().length === 0) {
      this.setState({
        error: 'Please enter a name for the chore',
      });
      return false;
    }
    return true;
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)} className="form">
        <label className="form__label" htmlFor="title">What is the name of this chore?</label>
        <input className="form__input" id="title" type="text" value={this.state.title} onChange={(event) => { this.setState({ title: event.target.value, slug: makeSlug(event.target.value) }); }} />

        <label className="form__label" htmlFor="frequency">How often do you need to do this chore?</label>
        <input className="form__input" id="frequency" type="number" min="0" max="365" value={this.state.frequency} onChange={(event) => { this.setState({ frequency: event.target.value }); }} />

        <label className="form__label" htmlFor="pointsPerTime">How many points should this chore be worth? (1 - 200)</label>
        <input className="form__input" id="pointsPerTime" type="number" min="1" max="250" value={this.state.pointsPerTime} onChange={(event) => { this.setState({ pointsPerTime: event.target.value }); }} />

        <label className="form__label" htmlFor="doneDate">When was the last time you did this chore?</label>
        <input className="form__input" id="doneDate" type="date" value={this.state.doneDate} max={fecha.format(this.props.currentTime, 'YYYY-MM-DD')} onChange={(event) => { this.setState({ doneDate: event.target.value, lastDone: new Date(event.target.value).getTime() }); }} />

        { this.state.error ? <p>{this.state.error}</p> : null }

        <div className="form__button-holder">
          <button className="form__button" type="submit">Save Chore</button>
          <Link className="form__button form__button--secondary" to={routes.CHORES}>Cancel</Link>
        </div>
      </form>
    );
  }
}

export default ChoreForm;
