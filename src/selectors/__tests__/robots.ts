import {
  selectIsExtinguishing,
  selectIsFetching,
  selectIsRecycling,
  selectIsShipping,
  selectRobotsData,
  selectRobotsState,
} from '../robots';
import { IRobot, IRobotAppState, IRobotData } from './../../models';

const currentAppState = {
  robots: {
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
  } as IRobotAppState
}

describe('Testing robots selectors', () => {

  it('should return the correct robots state', () => {
    const expected = currentAppState.robots;
    const actual = selectRobotsState(currentAppState);
    expect(actual).toEqual(expected);
  });

  it('should return robots in array format', () => {
    const expected = [
      { id: 1, name: 'Robot1', configuration: { hasSentience: true, hasWheels: true, hasTracks: true, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire']} as IRobot,
      { id: 2, name: 'Robot2', configuration: { hasSentience: false, hasWheels: false, hasTracks: false, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire'] } as IRobot,
      { id: 3, name: 'Robot3', configuration: { hasSentience: false, hasWheels: true, hasTracks: false, numberOfRotors: 8, colour: 'blue' }, statuses: ['on fire'] } as IRobot
    ]
    const actual = selectRobotsData(currentAppState);
    expect(actual).toEqual(expected);
  });
});

describe('Testing loading selectors', () => {
  it('should return the correct robots loading flag', () => {
    expect(selectIsFetching(currentAppState)).toEqual(false);
    expect(selectIsExtinguishing(currentAppState)).toEqual(false);
    expect(selectIsRecycling(currentAppState)).toEqual(false);
    expect(selectIsShipping(currentAppState)).toEqual(false);
  });
});