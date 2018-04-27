import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import configureStore from './store/index';

// import Routes from './components/Routes/Routes';

import './App.css';

const { store } = configureStore();

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {/* <Routes /> */}
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
