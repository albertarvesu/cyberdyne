import { get } from 'lodash';
import { IAppState, IRobot, IRobotAppState } from './../models';

export const selectRobotsState = (state: IAppState): IRobotAppState => get(state, 'robots');

export const selectRobotsData = (state: IAppState): IRobot[] => {
  const robots = get(selectRobotsState(state), 'data');
  return Object.keys(robots).map(id => robots[id]);
};