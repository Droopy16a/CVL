import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';

import Timer from './scripts/timer';
import Logo from './scripts/logo';
import Main from './scripts/main';
import Turn from './scripts/Turn';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
var date = new Date();
console.log(date);

root.render(
  <React.StrictMode>
    {/* <Logo/> */}
    <Main />
    <Turn />
    {/* <Timer /> */}
  </React.StrictMode>
);

reportWebVitals();
