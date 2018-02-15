import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';

import './index.css';

const Actions = () => (
  <div className="actions">
    <Link to={routes.NEW_CHORE} className="form__button form__button--secondary">Add a chore</Link>
  </div>
);

export default Actions;
