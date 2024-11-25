import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './components/store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root')
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,

);




reportWebVitals(console.log);
