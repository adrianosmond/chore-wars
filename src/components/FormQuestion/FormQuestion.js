import React from 'react';
import PropTypes from 'prop-types';

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

FormQuestion.propTypes = {
  id: PropTypes.string.isRequired,
  currentQuestionId: PropTypes.string.isRequired,
  noLabel: PropTypes.bool,
  error: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

FormQuestion.defaultProps = {
  noLabel: false,
};

export default FormQuestion;
