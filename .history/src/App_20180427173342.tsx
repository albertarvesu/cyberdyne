import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';

import configureStore from './store';

import QualityAssurance from './components/QualityAssurance';

import './App.css';

const { store } = configureStore();

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact={true} path="/" component={QualityAssurance} />
            {/* <Route path="/shipping" component={Shipping} /> */}
            <Redirect to="/" push={true} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
