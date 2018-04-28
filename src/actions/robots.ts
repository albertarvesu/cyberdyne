import { IRobot } from '../models';
import * as ACTION_TYPES from './../constants/actionTypes';

export interface IListMeta {
  offset?: number | null;
  limit?: number | null;
}

export type IGetRobots = (meta?: IListMeta) => void;

export const getRobots = (meta: IListMeta = {}) => ({
  payload: meta,
  type: ACTION_TYPES.GET_ROBOTS,
});

export type IExtinguishRobot = (robot: IRobot) => void;

export const extinguishRobot = (robot: IRobot) => ({
  payload: robot,
  type: ACTION_TYPES.EXTINGUISH_ROBOT,
});

export type IRecycleRobots = (robots: IRobot[]) => void;

export const recycleRobots = (robots: IRobot[]) => ({
  payload: robots,
  type: ACTION_TYPES.RECYCLE_ROBOTS,
});

export type IShipRobots = (robots: IRobot[]) => void;

export const shipRobots = (robots: IRobot[]) => ({
  payload: robots,
  type: ACTION_TYPES.SHIP_ROBOTS,
});



