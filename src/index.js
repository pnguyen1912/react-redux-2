import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import './index.scss';

const Root = () => (
  <Provider store={store}>

    <App />
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'));
