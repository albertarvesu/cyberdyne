import { all, fork } from 'redux-saga/effects';

import { watchGetRobots } from './robots';

export function* rootSaga() {
  yield all([
    fork(watchGetRobots),
  ]);
}

export default rootSaga;
