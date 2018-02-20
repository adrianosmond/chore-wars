import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fecha from 'fecha';

import * as routes from '../../constants/routes';
import { makeSlug } from '../../constants/utils';

import './index.css';

const FormQuestion = (props) => {
  if (props.id !== props.currentQuestionId) return null;
  return (
    <div className="form__question">
      <label>
        <span className={`form__label${props.error ? ' form__label--error' : ''}`}>
          {props.label}
        </span>
        {props.children}
      </label>
    </div>
  );
};

const allQuestions = ['title', 'frequency', 'pointsPerTime', 'lastDone'];

class ChoreForm extends Component {
  constructor(props) {
    super(props);

    const { chore } = props;

    this.state = {
      ...chore,
      slug: makeSlug(chore.title),
      doneDate: fecha.format(chore.lastDone, 'YYYY-MM-DD'),
      currentQuestionId: 'title',
      questions: props.questions || allQuestions,
      error: false,
    };
  }

  formIsValid() {
    if (this.state.currentQuestionId === 'title') {
      if (this.state.title.trim().length === 0) {
        this.setState({
          error: true,
        });
        return false;
      }
    }
    return true;
  }

  isFirstQuestion() {
    const { currentQuestionId, questions } = this.state;
    return questions.indexOf(currentQuestionId) === 0;
  }

  isLastQuestion() {
    const { currentQuestionId, questions } = this.state;
    return questions.indexOf(currentQuestionId) === questions.length - 1;
  }

  nextQuestion(event) {
    event.preventDefault();
    if (!this.formIsValid()) return;
    const { currentQuestionId, questions } = this.state;
    const currentIndex = questions.indexOf(currentQuestionId);
    this.setState({
      error: false,
      currentQuestionId: questions[currentIndex + 1],
    });
  }

  prevQuestion(event) {
    event.preventDefault();
    const { currentQuestionId, questions } = this.state;
    const currentIndex = questions.indexOf(currentQuestionId);
    this.setState({
      error: false,
      currentQuestionId: questions[currentIndex - 1],
    });
  }

  onSubmit(event) {
    event.preventDefault();

    if (!this.formIsValid()) return false;

    const {
      doneDate,
      error,
      slug,
      currentQuestionId,
      ...chore
    } = this.state;

    chore.frequency = parseInt(this.state.frequency, 10);
    chore.pointsPerTime = parseInt(this.state.pointsPerTime, 10);

    this.props.onSubmit(chore, slug);
    return false;
  }

  render() {
    return (
      <div className="chore-form">
        <form onSubmit={this.onSubmit.bind(this)} className="form">
          <FormQuestion id="title" currentQuestionId={this.state.currentQuestionId} 
            label="What is the name of this chore?" error={this.state.error}>
            <input className="form__input" id="title" type="text" value={this.state.title} onChange={(event) => { this.setState({ title: event.target.value, slug: makeSlug(event.target.value) }); }} />
          </FormQuestion>
          <FormQuestion id="frequency" currentQuestionId={this.state.currentQuestionId}
            label="How often do you need to do this chore?" error={this.state.error}>
            <div className="form__row">
              <span className="form__row-item">Every </span>
              <input className="form__row-item form__input" id="frequency" type="number" pattern="[0-9]*" min="0" max="365" maxLength="3" value={this.state.frequency} onChange={(event) => { this.setState({ frequency: event.target.value }); }} />
              <span className="form__row-item">days</span>
            </div>
          </FormQuestion>
          <FormQuestion id="pointsPerTime" currentQuestionId={this.state.currentQuestionId}
            label="How many points should this chore be worth?" error={this.state.error}>
            <p></p>
            <input className="form__input" id="pointsPerTime" type="number" pattern="[0-9]*" min="1" max="250" value={this.state.pointsPerTime} onChange={(event) => { this.setState({ pointsPerTime: event.target.value }); }} />
          </FormQuestion>
          <FormQuestion id="lastDone" currentQuestionId={this.state.currentQuestionId}
            label="When was the last time you did this chore?" error={this.state.error}>
            <input className="form__input" id="doneDate" type="date" value={this.state.doneDate} max={fecha.format(this.props.currentTime, 'YYYY-MM-DD')} onChange={(event) => { this.setState({ doneDate: event.target.value, lastDone: new Date(event.target.value).getTime() }); }} />
          </FormQuestion>

          <div className="form__button-holder">
            { this.isFirstQuestion() ? <Link className="form__button form__button--secondary" to={routes.CHORES}>Cancel</Link> : null }
            { !this.isFirstQuestion() ? <button className="form__button form__button--secondary" onClick={this.prevQuestion.bind(this)}>Back</button> : null }
            { !this.isLastQuestion() ? <button className="form__button" onClick={this.nextQuestion.bind(this)}>Continue</button> : null }
            { this.isLastQuestion() ? <button className="form__button" type="submit">Save Chore</button> : null }
          </div>
        </form>
      </div>
    );
  }
}

export default ChoreForm;
