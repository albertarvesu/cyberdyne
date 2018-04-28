import * as ACTION_TYPES from './../../constants/actionTypes';
import { getRobots } from './../robots';

describe('Testing robots actions: getRobots', () => {
  it('should dispatch get robot with correct params', () => {
    const data = {
      offset: 0,
      limit: 10,
    };
    const expected = { type: ACTION_TYPES.GET_ROBOTS, payload: data };
    const actual = getRobots(data);
    expect(actual).toEqual(expected);
    expect(actual.payload.offset).toEqual(0);
  });
});
