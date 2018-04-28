import { all, fork } from 'redux-saga/effects';

import {
  watchExtinguishRobot,
  watchGetRobots,
  watchRecycleRobots,
  watchShipRobots,
} from './robots';

export function* rootSaga() {
  yield all([
    fork(watchGetRobots),
    fork(watchExtinguishRobot),
    fork(watchRecycleRobots),
    fork(watchShipRobots),
  ]);
}

export default rootSaga;
