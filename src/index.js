import React from 'react';
import ReactDOM from 'react-dom';
import { GameProvider } from 'contexts/game';
import './index.css';
import App from './App';

ReactDOM.render(
  <GameProvider>
    <App />
  </GameProvider>,
  document.getElementById('root'),
);
