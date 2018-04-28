import { call, put, takeLatest } from 'redux-saga/effects';
import { IAppAction } from '../actions';
import * as ACTION_TYPES from '../constants/actionTypes';
import * as API from './../api/robots';

export function* getRobots(action: IAppAction) {
  try {
    const robots = yield call(API.getRobots, action.payload);
    yield put({
      payload: robots,
      type: ACTION_TYPES.GET_ROBOTS_SUCCESS,
    });
  } catch (error) {
    yield put({
      payload: error.message,
      type: ACTION_TYPES.GET_ROBOTS_FAILURE
    });
  }
}

export function* watchGetRobots() {
  yield takeLatest(ACTION_TYPES.GET_ROBOTS, getRobots);
}

export function* extinguishRobot(action: IAppAction) {
  try {
    const robot = yield call(API.extinguishRobot, action.payload);
    yield put({
      payload: robot,
      type: ACTION_TYPES.EXTINGUISH_ROBOT_SUCCESS,
    });
  } catch (error) {
    yield put({
      payload: error.message,
      type: ACTION_TYPES.EXTINGUISH_ROBOT_FAILURE
    });
  }
}

export function* watchExtinguishRobot() {
  yield takeLatest(ACTION_TYPES.EXTINGUISH_ROBOT, extinguishRobot);
}

export function* recycleRobots(action: IAppAction) {
  try {
    const robots = yield call(API.recycleRobots, action.payload);
    yield put({
      payload: robots,
      type: ACTION_TYPES.RECYCLE_ROBOTS_SUCCESS,
    });
  } catch (error) {
    yield put({
      payload: error.message,
      type: ACTION_TYPES.RECYCLE_ROBOTS_FAILURE
    });
  }
}

export function* watchRecycleRobots() {
  yield takeLatest(ACTION_TYPES.RECYCLE_ROBOTS, recycleRobots);
}

export function* shipRobots(action: IAppAction) {
  try {
    const robots = yield call(API.shipRobots, action.payload);
    yield put({
      payload: robots,
      type: ACTION_TYPES.SHIP_ROBOTS_SUCCESS,
    });
  } catch (error) {
    yield put({
      payload: error.message,
      type: ACTION_TYPES.SHIP_ROBOTS_FAILURE
    });
  }
}

export function* watchShipRobots() {
  yield takeLatest(ACTION_TYPES.SHIP_ROBOTS, shipRobots);
}
