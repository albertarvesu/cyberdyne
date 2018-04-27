import { call, put, select, take, takeLatest } from 'redux-saga/effects';
import { IAppAction } from '../actions';
import * as ACTION_TYPES from '../constants/actionTypes';
import * as API from './../api/robots';

export function* getRobots(action: IAppAction) {
  try {
    const robots = yield call(API.getRobots, action.payload);
    yield put(
      {
        payload: robots,
        type: ACTION_TYPES.GET_ROBOTS_SUCCESS,
      } as IAppAction
    );
  } catch (error) {
    yield put(
      {
        payload: error.message,
        type: ACTION_TYPES.GET_ROBOTS_FAILURE
      } as IAppAction
    );
  }
}

export function* watchGetRobots() {
  yield takeLatest(ACTION_TYPES.GET_ROBOTS, getRobots);
}
