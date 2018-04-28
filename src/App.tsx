import { Layout } from 'antd';
import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';

import configureStore from './store';

import QualityAssurance from './components/QualityAssurance';
import Shipping from './components/Shipping';

import './App.css';

const { store } = configureStore();

const { Content, Footer, Header } = Layout;

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
          <Layout className="layout">
            <Header>
              <h2 className="company-name">The Cyberdyne Systems</h2>
            </Header>
          <Content>
            <Switch>
              <Route exact={true} path="/" component={QualityAssurance} />
              <Route path="/shipping" component={Shipping} />
              <Redirect to="/" push={true} />
            </Switch>
          </Content>
          <Footer className="center">
            The Cyberdyne Systems © 2018
          </Footer>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
