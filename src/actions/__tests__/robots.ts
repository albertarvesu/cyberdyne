import { IRobot } from '../../models';
import * as ACTION_TYPES from './../../constants/actionTypes';
import { extinguishRobot, getRobots, recycleRobots } from './../robots';

describe('Testing robots actions: getRobots', () => {
  it('should dispatch GET_ROBOTS with correct params', () => {
    const data = {
      offset: 0,
      limit: 10,
    };
    const expected = { type: ACTION_TYPES.GET_ROBOTS, payload: data };
    const actual = getRobots(data);
    expect(actual).toEqual(expected);
  });
});

describe('Testing robots actions: extinguishRobot', () => {
  it('should dispatch EXTINGUISH_ROBOTS with correct params', () => {
    const robot = {
      id: 1,
      name: 'Robot1',
      configuration: {
        hasSentience: true,
        hasWheels: true,
        hasTracks: true,
        numberOfRotors: 8,
        colour: 'red'
      },
      statuses: ['on fire']
    } as IRobot;

    const expected = { type: ACTION_TYPES.EXTINGUISH_ROBOT, payload: robot };
    const actual = extinguishRobot(robot);
    expect(actual).toEqual(expected);

  });
});

describe('Testing robots actions: recycleRobots', () => {
  it('should dispatch RECYCLE_ROBOTS with correct params', () => {
    const robots = [
      {
        id: 1,
        name: 'Robot1',
        configuration: {
          hasSentience: true,
          hasWheels: true,
          hasTracks: true,
          numberOfRotors: 8,
          colour: 'red'
        },
        statuses: ['on fire']
      } as IRobot,
      {
        id: 2,
        name: 'Robot2',
        configuration: {
          hasSentience: true,
          hasWheels: true,
          hasTracks: true,
          numberOfRotors: 8,
          colour: 'red'
        },
        statuses: ['on fire']
      } as IRobot
    ];

    const expected = { type: ACTION_TYPES.RECYCLE_ROBOTS, payload: robots };
    const actual = recycleRobots(robots);
    expect(actual).toEqual(expected);

  });
});
