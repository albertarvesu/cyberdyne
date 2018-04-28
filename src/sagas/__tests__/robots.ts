import { call, put } from 'redux-saga/effects';
import * as ACTION_TYPES from './../../constants/actionTypes';
import { extinguishRobot, getRobots, recycleRobots, shipRobots } from './../robots';

import {
  extinguishRobot as extinguishRobotApi,
  getRobots as getRobotsApi,
  recycleRobots as recycleRobotsApi,
  shipRobots as shipRobotsApi,
} from '../../api/robots';
import { IRobot } from '../../models';

describe('Testing getRobots saga', () => {
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

describe('Testing extinguishRobot saga', () => {
  it('testing extinguishRobot should dispatch success', () => {
    const payload = {
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
    const generator = extinguishRobot({ type: ACTION_TYPES.EXTINGUISH_ROBOT, payload });
    expect(generator.next().value).toEqual(call(extinguishRobotApi, payload));
    expect(generator.next().value).toEqual(put({ type: ACTION_TYPES.EXTINGUISH_ROBOT_SUCCESS }));
  });
  it('testing getRobots should dispatch failure', () => {
    const payload = {
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
    const generator = extinguishRobot({ type: ACTION_TYPES.EXTINGUISH_ROBOT, payload });
    expect(generator.next().value).toEqual(call(extinguishRobotApi, payload));
    if (generator.throw) {
      expect(generator.throw('error').value).toEqual(put({ type: ACTION_TYPES.EXTINGUISH_ROBOT_FAILURE }));
    }
  });
});

describe('Testing recycleRobots saga', () => {
  it('testing recycleRobots should dispatch success', () => {
    const payload = [
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
    const generator = recycleRobots({ type: ACTION_TYPES.RECYCLE_ROBOTS, payload });
    expect(generator.next().value).toEqual(call(recycleRobotsApi, payload));
    expect(generator.next().value).toEqual(put({ type: ACTION_TYPES.RECYCLE_ROBOTS_SUCCESS }));
  });
  it('testing getRobots should dispatch failure', () => {
    const payload = [
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
    const generator = recycleRobots({ type: ACTION_TYPES.RECYCLE_ROBOTS, payload });
    expect(generator.next().value).toEqual(call(recycleRobotsApi, payload));
    if (generator.throw) {
      expect(generator.throw('error').value).toEqual(put({ type: ACTION_TYPES.RECYCLE_ROBOTS_FAILURE }));
    }
  });
});

describe('Testing shipRobots saga', () => {
  it('testing shipRobots should dispatch success', () => {
    const payload = [
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
    const generator = shipRobots({ type: ACTION_TYPES.SHIP_ROBOTS, payload });
    expect(generator.next().value).toEqual(call(shipRobotsApi, payload));
    expect(generator.next().value).toEqual(put({ type: ACTION_TYPES.SHIP_ROBOTS_SUCCESS }));
  });
  it('testing getRobots should dispatch failure', () => {
    const payload = [
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
    const generator = shipRobots({ type: ACTION_TYPES.SHIP_ROBOTS, payload });
    expect(generator.next().value).toEqual(call(shipRobotsApi, payload));
    if (generator.throw) {
      expect(generator.throw('error').value).toEqual(put({ type: ACTION_TYPES.SHIP_ROBOTS_FAILURE }));
    }
  });
});


