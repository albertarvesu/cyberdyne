import { all, fork } from 'redux-saga/effects';

import { watchGetRobots } from './robots';

export function* rootSaga() {
  yield all(
    [watchGetRobots]
  );
}

export default rootSaga;
