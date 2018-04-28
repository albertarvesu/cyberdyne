import { get } from 'lodash';
import { isForExtinguishing, isForRecycling } from '../utils/robots';
import { IAppState, IRobot, IRobotAppState } from './../models';

export const selectRobotsState = (state: IAppState): IRobotAppState => get(state, 'robots');

export const selectRobotsData = (state: IAppState): IRobot[] => {
  const robots = get(selectRobotsState(state), 'data', []);
  return Object.keys(robots).map(id => robots[id]);
};

export const selectQualityRobots = (state: IAppState): IRobot[] => {
  const robots = selectRobotsData(state);
  return robots.filter(robot => !isForRecycling(robot) && !isForExtinguishing(robot))
}

export const selectIsFetching = (state: IAppState): boolean => get(selectRobotsState(state), 'isFetching');

export const selectIsExtinguishing = (state: IAppState): boolean => get(selectRobotsState(state), 'isExtinguishing');

export const selectIsRecycling = (state: IAppState): boolean => get(selectRobotsState(state), 'isRecycling');

export const selectIsShipping = (state: IAppState): boolean => get(selectRobotsState(state), 'isShipping');
