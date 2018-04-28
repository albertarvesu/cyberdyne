import { get } from 'lodash';
import { IAppState, IRobot, IRobotAppState } from './../models';

export const selectRobotsState = (state: IAppState): IRobotAppState => get(state, 'robots');

export const selectRobotsData = (state: IAppState): IRobot[] => {
  const robots = get(selectRobotsState(state), 'data');
  return Object.keys(robots).map(id => robots[id]);
};

export const selectIsFetching = (state: IAppState): boolean => get(selectRobotsState(state), 'isFetching');

export const selectIsExtinguishing = (state: IAppState): boolean => get(selectRobotsState(state), 'isExtinguishing');

export const selectIsRecycling = (state: IAppState): boolean => get(selectRobotsState(state), 'isRecycling');

export const selectIsShipping = (state: IAppState): boolean => get(selectRobotsState(state), 'isShipping');
