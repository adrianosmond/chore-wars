import React from 'react';

import './Loading.css';

import loading1 from './loading1.png';
import loading2 from './loading2.png';

const Loading = () => (
  <div className="loading">
    <div className="loading__image-wrapper">
      <img src={loading1} alt="" className="loading__image loading__image--1" />
      <img src={loading2} alt="" className="loading__image loading__image--2" />
    </div>
    <h1 className="loading__text">Loading</h1>
  </div>
);

export default Loading;
