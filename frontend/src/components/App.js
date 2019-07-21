import React from 'react';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Landing from '../pages/landing';
import Signin from '../pages/signin';
import Register from '../pages/register';

import Header from './containers/Header';

const App = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div className="container">
          <Route exact path="/" component={Landing} />
          <Route path="/signin" component={Signin} />
          <Route path="/Register" component={Register} />
        </div>
      </Router>
    </Provider>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App;
