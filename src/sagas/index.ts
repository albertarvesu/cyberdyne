import { all, fork } from 'redux-saga/effects';

import { watchExtinguishRobot, watchGetRobots, watchRecycleRobots } from './robots';

export function* rootSaga() {
  yield all([
    fork(watchGetRobots),
    fork(watchExtinguishRobot),
    fork(watchRecycleRobots),
  ]);
}

export default rootSaga;
