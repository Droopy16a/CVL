import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';

import Main from './scripts/main';
import Turn from './scripts/Turn';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
    <Turn />
  </React.StrictMode>
);

reportWebVitals();
