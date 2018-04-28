import * as ACTION_TYPES from '../../constants/actionTypes';
import { robots } from '../robots';
import { IRobot, IRobotAppState, IRobotData } from './../../models';

const initialState: IRobotAppState = {
  data: {},
  hasError: false,
  isExtinguishing: false,
  isFetching: false,
  isRecycling: false,
  isShipping: false,
};

describe('Testing Initial state: robots', () => {
  it('should return the default state', () => {
    const actual = robots(initialState, { type: 'UNKNOWN_ACTION' });
    expect(actual).toEqual(initialState);
  });
});

describe('Testing initiate states: robots', () => {

  it('should switch isFetching = true', () => {
    const actual = robots(initialState, { type: ACTION_TYPES.GET_ROBOTS });
    expect(actual.isFetching).toEqual(true);
  });

  it('should switch isExtinguishing = true', () => {
    const actual = robots(initialState, { type: ACTION_TYPES.EXTINGUISH_ROBOT });
    expect(actual.isExtinguishing).toEqual(true);
  });

  it('should switch isRecycling = true', () => {
    const actual = robots(initialState, { type: ACTION_TYPES.RECYCLE_ROBOTS });
    expect(actual.isRecycling).toEqual(true);
  });

  it('should switch isShipping = true', () => {
    const actual = robots(initialState, { type: ACTION_TYPES.SHIP_ROBOTS });
    expect(actual.isShipping).toEqual(true);
  });

});

describe('Testing success: GET_ROBOTS_SUCCESS', () => {

  it('should return empty object when API return nothing', () => {
    const payload = {
      data: [],
    };
    const actual = robots(initialState, { type: ACTION_TYPES.GET_ROBOTS_SUCCESS, payload });
    expect(actual).toEqual(initialState);
  });

  it('should return transformed key -> value object when API return robots', () => {
    const payload = {
      data: [
        { id: 1, name: 'Robot1', configuration: { hasSentience: true, hasWheels: true, hasTracks: true, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire']} as IRobot,
        { id: 2, name: 'Robot2', configuration: { hasSentience: false, hasWheels: false, hasTracks: false, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire'] } as IRobot,
        { id: 3, name: 'Robot3', configuration: { hasSentience: false, hasWheels: true, hasTracks: false, numberOfRotors: 8, colour: 'blue' }, statuses: ['on fire'] } as IRobot
      ],
    };
    const expected: IRobotAppState = {
      data: {
        1: { id: 1, name: 'Robot1', configuration: { hasSentience: true, hasWheels: true, hasTracks: true, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire']} as IRobot,
        2: { id: 2, name: 'Robot2', configuration: { hasSentience: false, hasWheels: false, hasTracks: false, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire'] } as IRobot,
        3: { id: 3, name: 'Robot3', configuration: { hasSentience: false, hasWheels: true, hasTracks: false, numberOfRotors: 8, colour: 'blue' }, statuses: ['on fire'] } as IRobot
      } as IRobotData,
      hasError: false,
      isExtinguishing: false,
      isFetching: false,
      isRecycling: false,
      isShipping: false,
    };
    const actual = robots(initialState, { type: ACTION_TYPES.GET_ROBOTS_SUCCESS, payload });
    expect(actual).toEqual(expected);
  });

  it('should return merge existing with new robots', () => {
    const currentState: IRobotAppState = {
      data: {
        1: { id: 1, name: 'Robot1', configuration: { hasSentience: true, hasWheels: true, hasTracks: true, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire']} as IRobot,
        2: { id: 2, name: 'Robot2', configuration: { hasSentience: false, hasWheels: false, hasTracks: false, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire'] } as IRobot,
        3: { id: 3, name: 'Robot3', configuration: { hasSentience: false, hasWheels: true, hasTracks: false, numberOfRotors: 8, colour: 'blue' }, statuses: ['on fire'] } as IRobot
      },
      hasError: false,
      isExtinguishing: false,
      isFetching: false,
      isRecycling: false,
      isShipping: false,
    };
    const payload = {
      data: [
        { id: 2, name: 'Robot2', configuration: { hasSentience: false, hasWheels: false, hasTracks: false, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire'] } as IRobot,
        { id: 3, name: 'Robot3', configuration: { hasSentience: false, hasWheels: true, hasTracks: false, numberOfRotors: 8, colour: 'blue' }, statuses: ['on fire'] } as IRobot
      ],
    };
    const expected: IRobotAppState = {
      data: {
        1: { id: 1, name: 'Robot1', configuration: { hasSentience: true, hasWheels: true, hasTracks: true, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire']} as IRobot,
        2: { id: 2, name: 'Robot2', configuration: { hasSentience: false, hasWheels: false, hasTracks: false, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire'] } as IRobot,
        3: { id: 3, name: 'Robot3', configuration: { hasSentience: false, hasWheels: true, hasTracks: false, numberOfRotors: 8, colour: 'blue' }, statuses: ['on fire'] } as IRobot
      } as IRobotData,
      hasError: false,
      isExtinguishing: false,
      isFetching: false,
      isRecycling: false,
      isShipping: false,
    };
    const actual = robots(currentState, { type: ACTION_TYPES.GET_ROBOTS_SUCCESS, payload });
    expect(actual).toEqual(expected);
  });
});

describe('Testing success: EXTINGUISH_ROBOT_SUCCESS', () => {

  it('should update the robots matching the id and remove the on fire status', () => {
    const currentState: IRobotAppState = {
      data: {
        1: { id: 1, name: 'Robot1', configuration: { hasSentience: true, hasWheels: true, hasTracks: true, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire', 'rusty']} as IRobot,
        2: { id: 2, name: 'Robot2', configuration: { hasSentience: false, hasWheels: false, hasTracks: false, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire', 'rusty'] } as IRobot,
        3: { id: 3, name: 'Robot3', configuration: { hasSentience: false, hasWheels: true, hasTracks: false, numberOfRotors: 8, colour: 'blue' }, statuses: ['on fire', 'loose screws'] } as IRobot
      },
      hasError: false,
      isExtinguishing: false,
      isFetching: false,
      isRecycling: false,
      isShipping: false,
    };
    const payload = {
      data: { id: 2, name: 'Robot2', configuration: { hasSentience: false, hasWheels: false, hasTracks: false, numberOfRotors: 8, colour: 'red' }, statuses: ['rusty'] } as IRobot,
    };
    const expected: IRobotAppState = {
      data: {
        1: { id: 1, name: 'Robot1', configuration: { hasSentience: true, hasWheels: true, hasTracks: true, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire', 'rusty']} as IRobot,
        2: { id: 2, name: 'Robot2', configuration: { hasSentience: false, hasWheels: false, hasTracks: false, numberOfRotors: 8, colour: 'red' }, statuses: ['rusty'] } as IRobot,
        3: { id: 3, name: 'Robot3', configuration: { hasSentience: false, hasWheels: true, hasTracks: false, numberOfRotors: 8, colour: 'blue' }, statuses: ['on fire', 'loose screws'] } as IRobot
      } as IRobotData,
      hasError: false,
      isExtinguishing: false,
      isFetching: false,
      isRecycling: false,
      isShipping: false,
    };
    const actual = robots(currentState, { type: ACTION_TYPES.EXTINGUISH_ROBOT_SUCCESS, payload });
    expect(actual).toEqual(expected);
  });

  it('should return the current state if API response returns null robot', () => {
    const currentState: IRobotAppState = {
      data: {
        1: { id: 1, name: 'Robot1', configuration: { hasSentience: true, hasWheels: true, hasTracks: true, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire', 'rusty']} as IRobot,
        2: { id: 2, name: 'Robot2', configuration: { hasSentience: false, hasWheels: false, hasTracks: false, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire', 'rusty'] } as IRobot,
        3: { id: 3, name: 'Robot3', configuration: { hasSentience: false, hasWheels: true, hasTracks: false, numberOfRotors: 8, colour: 'blue' }, statuses: ['on fire', 'loose screws'] } as IRobot
      },
      hasError: false,
      isExtinguishing: false,
      isFetching: false,
      isRecycling: false,
      isShipping: false,
    };
    const payload = {
      data: null,
    };
    const actual = robots(currentState, { type: ACTION_TYPES.EXTINGUISH_ROBOT_SUCCESS, payload });
    expect(actual).toEqual(currentState);
  });
});

describe('Testing success: RECYCLE_ROBOTS_SUCCESS/SHIP_ROBOTS_SUCCESS', () => {
  it('should remove the robot from the store when id matched', () => {
    const currentState: IRobotAppState = {
      data: {
        1: { id: 1, name: 'Robot1', configuration: { hasSentience: true, hasWheels: true, hasTracks: true, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire', 'rusty']} as IRobot,
        2: { id: 2, name: 'Robot2', configuration: { hasSentience: false, hasWheels: false, hasTracks: false, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire', 'rusty'] } as IRobot,
        3: { id: 3, name: 'Robot3', configuration: { hasSentience: false, hasWheels: true, hasTracks: false, numberOfRotors: 8, colour: 'blue' }, statuses: ['on fire', 'loose screws'] } as IRobot
      },
      hasError: false,
      isExtinguishing: false,
      isFetching: false,
      isRecycling: false,
      isShipping: false,
    };
    const payload = {
      data: [1,3],
    };
    const expected: IRobotAppState = {
      data: {
        2: { id: 2, name: 'Robot2', configuration: { hasSentience: false, hasWheels: false, hasTracks: false, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire', 'rusty'] } as IRobot,
      } as IRobotData,
      hasError: false,
      isExtinguishing: false,
      isFetching: false,
      isRecycling: false,
      isShipping: false,
    };
    const actual = robots(currentState, { type: ACTION_TYPES.RECYCLE_ROBOTS_SUCCESS, payload });
    expect(actual).toEqual(expected);
  });
  it('should return current state when received empty payload', () => {
    const currentState: IRobotAppState = {
      data: {
        1: { id: 1, name: 'Robot1', configuration: { hasSentience: true, hasWheels: true, hasTracks: true, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire', 'rusty']} as IRobot,
        2: { id: 2, name: 'Robot2', configuration: { hasSentience: false, hasWheels: false, hasTracks: false, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire', 'rusty'] } as IRobot,
        3: { id: 3, name: 'Robot3', configuration: { hasSentience: false, hasWheels: true, hasTracks: false, numberOfRotors: 8, colour: 'blue' }, statuses: ['on fire', 'loose screws'] } as IRobot
      },
      hasError: false,
      isExtinguishing: false,
      isFetching: false,
      isRecycling: false,
      isShipping: false,
    };
    const payload = {
      data: [],
    };
    const actual = robots(currentState, { type: ACTION_TYPES.RECYCLE_ROBOTS_SUCCESS, payload });
    expect(actual).toEqual(currentState);
  })
});

describe('Testing failures:', () => {
  const payload = { message: 'Error' };
  const expected: IRobotAppState = {
    data: {} as IRobotData,
    errorMessage: 'Error',
    hasError: true,
    isExtinguishing: false,
    isFetching: false,
    isRecycling: false,
    isShipping: false,
  };
  const actual = robots(expected, { type: ACTION_TYPES.GET_ROBOTS_FAILURE, payload });
  expect(actual).toEqual(expected);
});
