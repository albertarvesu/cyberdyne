import { call, put } from 'redux-saga/effects';
import * as ACTION_TYPES from './../../constants/actionTypes';
import { getRobots } from './../robots';

import { getRobots as getRobotsApi } from '../../api/robots';

describe('Testing robots sagas', () => {
  it('testing getRobots should dispatch success', () => {
    const payload = {};
    const generator = getRobots({ type: ACTION_TYPES.GET_ROBOTS, payload });
    expect(generator.next().value).toEqual(call(getRobotsApi, payload));
    expect(generator.next().value).toEqual(put({ type: ACTION_TYPES.GET_ROBOTS_SUCCESS }));
  });
  it('testing getRobots should dispatch failure', () => {
    const payload = {};
    const generator = getRobots({ type: ACTION_TYPES.GET_ROBOTS, payload });
    expect(generator.next().value).toEqual(call(getRobotsApi, payload));
    if (generator.throw) {
      expect(generator.throw('error').value).toEqual(put({ type: ACTION_TYPES.GET_ROBOTS_FAILURE }));
    }
  });
});


