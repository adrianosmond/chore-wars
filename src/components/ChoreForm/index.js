import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fecha from 'fecha';

import * as routes from '../../constants/routes';
import { makeSlug } from '../../constants/utils';
import { MIN_CHORE_FREQUENCY, MAX_CHORE_FREQUENCY, MIN_CHORE_POINTS, MAX_CHORE_POINTS } from '../../constants/constants';

import './index.css';

const FormQuestion = (props) => {
  if (props.id !== props.currentQuestionId) return null;
  const TagName = props.noLabel ? 'div' : 'label';
  return (
    <div className="form__question">
      <TagName>
        <span className={`form__label${props.error ? ' form__label--error' : ''}`}>
          {props.label}
        </span>
        {props.children}
      </TagName>
    </div>
  );
};

const defaultQuestions = ['title', 'frequency', 'pointsPerTime', 'lastDone'];

class ChoreForm extends Component {
  constructor(props) {
    super(props);

    const { chore } = props;
    const questions = props.questions || defaultQuestions;
    this.state = {
      ...chore,
      slug: makeSlug(chore.title),
      doneDate: fecha.format(chore.lastDone, 'YYYY-MM-DD'),
      choreFrequency: chore.frequency === 0 ? 'as-and-when' : 'with-regularity',
      currentQuestionId: questions[0],
      questions,
      currentTime: props.currentTime,
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
    if (this.state.currentQuestionId === 'frequency') {
      if (this.state.choreFrequency === 'with-regularity') {
        const freq = parseInt(this.state.frequency, 10);
        if (typeof freq !== 'number' || freq < MIN_CHORE_FREQUENCY || freq > MAX_CHORE_FREQUENCY) {
          this.setState({
            error: true,
          });
          return false;
        }
      }
    }
    if (this.state.currentQuestionId === 'pointsPerTime') {
      const points = parseInt(this.state.pointsPerTime, 10);
      if (typeof points !== 'number' || points < 0 || points > 200) {
        this.setState({
          error: true,
        });
        return false;
      }
    }
    if (this.state.currentQuestionId === 'doneDate') {
      const date = parseInt(this.state.lastDone, 10);
      if (typeof date !== 'number' || date < 0 || date > this.props.currentTime) {
        this.setState({
          error: true,
        });
        return false;
      }
    }
    if (this.state.currentQuestionId === 'forgotToLog') {
      const date = parseInt(this.state.currentTime, 10);
      if (typeof date !== 'number' || date < 0 || date > this.props.currentTime) {
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

    const chore = {
      title: this.state.title,
      frequency: parseInt(this.state.frequency, 10),
      pointsPerTime: parseInt(this.state.pointsPerTime, 10),
      lastDone: this.state.lastDone,
    };

    this.props.onSubmit(chore, this.state.slug);
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
            label="How often do you need to do this chore?" error={this.state.error}
            noLabel={true}>
            <label className="form__option">
              <div className="form__row">
                <input type="radio" name="frequency-type" value="with-regularity"
                  checked={this.state.choreFrequency === 'with-regularity'}
                  onChange={() => this.setState({ choreFrequency: 'with-regularity' })} />
                <span className="form__row-item">Every </span>
                <input className="form__row-item form__input" id="frequency" type="number" pattern="[0-9]*"
                  min={MIN_CHORE_FREQUENCY} max={MAX_CHORE_FREQUENCY} maxLength={MAX_CHORE_FREQUENCY.toString().length}
                  value={this.state.frequency} onChange={(event) => { this.setState({ frequency: event.target.value }); }}
                  onClick={() => this.setState({ choreFrequency: 'with-regularity' })} />
                <span className="form__row-item">days</span>
              </div>
            </label>
            <label className="form__option">
            <div className="form__row form__row--inactive">
                <input type="radio" name="frequency-type" value="as-and-when"
                  checked={this.state.choreFrequency === 'as-and-when'}
                  onChange={() => this.setState({ choreFrequency: 'as-and-when' })} />
                <span className="form__row-item">Whenever it needs doing</span>
              </div>
            </label>
          </FormQuestion>
          <FormQuestion id="pointsPerTime" currentQuestionId={this.state.currentQuestionId}
            label="How many points should this chore be worth?" error={this.state.error}>
            <p></p>
            <input className="form__input" id="pointsPerTime" type="number" pattern="[0-9]*"
              min={MIN_CHORE_POINTS} max={MAX_CHORE_POINTS} maxLength={MAX_CHORE_POINTS.toString().length}
              value={this.state.pointsPerTime} onChange={(event) => { this.setState({ pointsPerTime: event.target.value }); }} />
          </FormQuestion>
          <FormQuestion id="lastDone" currentQuestionId={this.state.currentQuestionId}
            label="When was the this chore was done?" error={this.state.error}>
            <input className="form__input" id="doneDate" type="date"
            value={this.state.doneDate} max={fecha.format(this.props.currentTime, 'YYYY-MM-DD')}
            onChange={(event) => { this.setState({ doneDate: event.target.value, lastDone: new Date(event.target.value).getTime() }); }} />
          </FormQuestion>
          <FormQuestion id="forgotToLog" currentQuestionId={this.state.currentQuestionId}
            label="When did you do this chore?" error={this.state.error}>
            <input className="form__input" id="doneDate" type="datetime-local"
              value={fecha.format(this.state.currentTime, 'YYYY-MM-DDTHH:mm')} max={fecha.format(this.props.currentTime, 'YYYY-MM-DD')}
              onChange={(event) => {
                const currentTime = new Date(event.target.value).getTime();
                if (currentTime) {
                  const offset = new Date().getTimezoneOffset() * 60000;
                  this.setState({
                    currentTime,
                    lastDone: currentTime - offset,
                  });
                }
              }} />
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
