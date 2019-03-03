import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fecha from 'fecha';

import * as routes from 'constants/routes';
import { makeSlug } from 'constants/utils';
import {
  MIN_CHORE_FREQUENCY, MAX_CHORE_FREQUENCY, MIN_CHORE_POINTS, MAX_CHORE_POINTS,
} from 'constants/constants';

import './ChoreForm.css';

const FormQuestion = ({
  id, currentQuestionId, noLabel, error, label, children,
}) => {
  if (id !== currentQuestionId) return null;
  const TagName = noLabel ? 'div' : 'label';
  return (
    <div className="form__question">
      <TagName>
        <span className={`form__label${error ? ' form__label--error' : ''}`}>
          {label}
        </span>
        {children}
      </TagName>
    </div>
  );
};

const defaultQuestions = ['title', 'frequency', 'pointsPerTime', 'canBePaused', 'lastDone'];

class ChoreForm extends Component {
  constructor(props) {
    super(props);

    const { chore } = props;
    const questions = props.questions || defaultQuestions;
    this.state = {
      ...chore,
      slug: makeSlug(chore.title),
      frequency: chore.frequency === 0 ? 7 : chore.frequency,
      doneDate: fecha.format(chore.lastDone, 'YYYY-MM-DD'),
      choreFrequency: chore.frequency === 0 ? 'as-and-when' : 'with-regularity',
      canBePaused: chore.timePaused === undefined ? 'no' : 'yes',
      currentQuestionId: questions[0],
      questions,
      currentTime: props.currentTime,
      error: false,
    };
  }

  onSubmit(event) {
    event.preventDefault();

    const {
      title, choreFrequency, frequency, pointsPerTime, lastDone, canBePaused, slug,
    } = this.state;

    const { onSubmit } = this.props;

    if (!this.formIsValid()) return false;

    const chore = {
      title,
      frequency: choreFrequency === 'as-and-when' ? 0 : parseInt(frequency, 10),
      pointsPerTime: parseInt(pointsPerTime, 10),
      lastDone,
      timePaused: canBePaused === 'yes' ? 0 : null,
    };

    onSubmit(chore, slug);
    return false;
  }

  formIsValid() {
    const {
      currentQuestionId, currentTime, title, frequency, choreFrequency, pointsPerTime, lastDone,
    } = this.state;
    if (currentQuestionId === 'title') {
      if (title.trim().length === 0) {
        this.setState({
          error: true,
        });
        return false;
      }
    }
    if (currentQuestionId === 'frequency') {
      if (choreFrequency === 'with-regularity') {
        const freq = parseInt(frequency, 10);
        if (typeof freq !== 'number' || freq < MIN_CHORE_FREQUENCY || freq > MAX_CHORE_FREQUENCY) {
          this.setState({
            error: true,
          });
          return false;
        }
      }
    }
    if (currentQuestionId === 'pointsPerTime') {
      const points = parseInt(pointsPerTime, 10);
      if (typeof points !== 'number' || points < 0 || points > 200) {
        this.setState({
          error: true,
        });
        return false;
      }
    }
    if (currentQuestionId === 'doneDate') {
      const date = parseInt(lastDone, 10);
      if (typeof date !== 'number' || date < 0 || date > currentTime) {
        this.setState({
          error: true,
        });
        return false;
      }
    }
    if (currentQuestionId === 'forgotToLog') {
      const date = parseInt(currentTime, 10);
      if (typeof date !== 'number' || date < 0 || date > currentTime) {
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

  render() {
    const {
      currentQuestionId, error, choreFrequency, title, frequency, pointsPerTime,
      canBePaused, doneDate, currentTime,
    } = this.state;
    return (
      <div className="chore-form">
        <form onSubmit={this.onSubmit.bind(this)} className="form">
          <FormQuestion
            id="title"
            currentQuestionId={currentQuestionId}
            label="What is the name of this chore?"
            error={error}
          >
            <input className="form__input" id="title" type="text" value={title} onChange={(event) => { this.setState({ title: event.target.value, slug: makeSlug(event.target.value) }); }} />
          </FormQuestion>
          <FormQuestion
            id="frequency"
            currentQuestionId={currentQuestionId}
            label="How often do you need to do this chore?"
            error={error}
            noLabel
          >
            <label className="form__option">
              <div className="form__row">
                <input
                  type="radio"
                  name="frequency-type"
                  value="with-regularity"
                  checked={choreFrequency === 'with-regularity'}
                  onChange={() => this.setState({ choreFrequency: 'with-regularity' })}
                />
                <span className="form__row-item">Every </span>
                <input
                  className="form__row-item form__input"
                  id="frequency"
                  type="number"
                  pattern="[0-9]*"
                  min={MIN_CHORE_FREQUENCY}
                  max={MAX_CHORE_FREQUENCY}
                  maxLength={MAX_CHORE_FREQUENCY.toString().length}
                  value={frequency}
                  onChange={(event) => { this.setState({ frequency: event.target.value }); }}
                  onClick={() => this.setState({ choreFrequency: 'with-regularity' })}
                />
                <span className="form__row-item">days</span>
              </div>
            </label>
            <label className="form__option">
              <div className="form__row form__row--inactive">
                <input
                  type="radio"
                  name="frequency-type"
                  value="as-and-when"
                  checked={choreFrequency === 'as-and-when'}
                  onChange={() => this.setState({ choreFrequency: 'as-and-when' })}
                />
                <span className="form__row-item">Whenever it needs doing</span>
              </div>
            </label>
          </FormQuestion>
          <FormQuestion
            id="pointsPerTime"
            currentQuestionId={currentQuestionId}
            label="How many points should this chore be worth?"
            error={error}
          >
            <p />
            <input
              className="form__input"
              id="pointsPerTime"
              type="number"
              pattern="[0-9]*"
              min={MIN_CHORE_POINTS}
              max={MAX_CHORE_POINTS}
              maxLength={MAX_CHORE_POINTS.toString().length}
              value={pointsPerTime}
              onChange={(event) => { this.setState({ pointsPerTime: event.target.value }); }}
            />
          </FormQuestion>
          <FormQuestion
            id="canBePaused"
            currentQuestionId={currentQuestionId}
            label="Should this chore pause when you go on holiday?"
            error={error}
            noLabel
          >
            <label className="form__option">
              <div className="form__row">
                <input
                  type="radio"
                  name="affected-by-holiday"
                  value="yes"
                  checked={canBePaused === 'yes'}
                  onChange={() => this.setState({ canBePaused: 'yes' })}
                />
                <span className="form__row-item">Yes</span>
              </div>
            </label>
            <label className="form__option">
              <div className="form__row form__row--inactive">
                <input
                  type="radio"
                  name="affected-by-holiday"
                  value="no"
                  checked={canBePaused === 'no'}
                  onChange={() => this.setState({ canBePaused: 'no' })}
                />
                <span className="form__row-item">No</span>
              </div>
            </label>
          </FormQuestion>
          <FormQuestion
            id="lastDone"
            currentQuestionId={currentQuestionId}
            label="When was this chore last done?"
            error={error}
          >
            <input
              className="form__input"
              id="doneDate"
              type="date"
              value={doneDate}
              max={fecha.format(this.props.currentTime, 'YYYY-MM-DD')}
              onChange={(event) => {
                this.setState({
                  doneDate: event.target.value,
                  lastDone: new Date(event.target.value).getTime(),
                });
              }}
            />
          </FormQuestion>
          <FormQuestion
            id="forgotToLog"
            currentQuestionId={currentQuestionId}
            label="When did you do this chore?"
            error={error}
          >
            <input
              className="form__input"
              id="doneDate"
              type="datetime-local"
              value={fecha.format(currentTime, 'YYYY-MM-DDTHH:mm')}
              max={fecha.format(this.props.currentTime, 'YYYY-MM-DD')}
              onChange={(event) => {
                const newTime = new Date(event.target.value).getTime();
                if (newTime) {
                  const offset = new Date().getTimezoneOffset() * 60000;
                  this.setState({
                    currentTime: newTime,
                    lastDone: newTime - offset,
                  });
                }
              }}
            />
          </FormQuestion>

          <div className="form__button-holder">
            { this.isFirstQuestion() ? <Link className="form__button form__button--secondary" to={routes.CHORES}>Cancel</Link> : null }
            { !this.isFirstQuestion() ? <button type="button" className="form__button form__button--secondary" onClick={this.prevQuestion.bind(this)}>Back</button> : null }
            { !this.isLastQuestion() ? <button type="button" className="form__button" onClick={this.nextQuestion.bind(this)}>Continue</button> : null }
            { this.isLastQuestion() ? <button className="form__button" type="submit">Save Chore</button> : null }
          </div>
        </form>
      </div>
    );
  }
}

export { FormQuestion };

export default ChoreForm;
