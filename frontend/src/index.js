import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import main from './reducers';

import { createStore } from 'redux'

import 'bootstrap/scss/bootstrap.scss';
import './index.scss';

const store = createStore(main);
const unsubscribe = store.subscribe(() => console.log(store.getState()))
// unsubscribe();

ReactDOM.render(<App store={store} />, document.getElementById('root'));