# Cyberdyne

![license](https://img.shields.io/github/license/mashape/apistatus.svg) [![Build Status](https://travis-ci.org/albertarvesu/cyberdyne.svg?branch=master)](https://travis-ci.org/albertarvesu/cyberdyne) [![codecov](https://codecov.io/gh/albertarvesu/cyberdyne/branch/master/graph/badge.svg)](https://codecov.io/gh/albertarvesu/cyberdyne)

A simple web application to manage the QA and shipping process of a robot company.

[Demo](https://albertarvesu.github.io/cyberdyne/)

The app was created using `create-react-app` with `typescript`. Instruction on how to use this setup can be found [here](https://github.com/wmonk/create-react-app-typescript#tldr). NodeJS is being used on the backend and is currently deployed [here](http://cyberdyne-robotics.herokuapp.com/) while the source code is hosted on [Github](https://github.com/albertarvesu/rfcc-api). On the other hand, the application uses [Ant](https://ant.design) on the UI. Ant has rich sets of UI components and integration with React is quite easy.

The application state is powered by `redux` while uses `redux-saga` for middleware. There's  two major components in the app, `<QualityAssurance />` and `<Shipping />`, which represents two major stages of the manufacturing company. Ant UI framework became very handy to deliver the best possible user-experience.

### Running the app locally
```
git clone git@github.com:albertarvesu/cyberdyne.git`
cd cyberdyne
yarn start
```
_Note: requires 2 environment variables that needs to be set_

##### Global variables
1. `REACT_APP_API_URL` - the API URL endpoint (defaults to https://localhost:3001)
2. `REACT_APP_BASENAME` - sets the basename props for the `<BrowserRouter />` (defaults to `/`)


### Integrations
[Travis CI](https://travis-ci.org/albertarvesu/cyberdyne)
[Codecov](https://codecov.io/)

### Running builds
```
yarn build
```

### Running Test
```
yarn test
```
To generate test coverage
```
yarn test:coverage
```