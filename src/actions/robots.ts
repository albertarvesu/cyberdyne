import * as ACTION_TYPES from './../constants/actionTypes';

export interface IListMeta {
  offset?: number | null;
  limit?: number | null;
}

export type IGetRobots = (meta?: IListMeta) => void;

export const getRobots = (meta: IListMeta = {} ) => ({
  payload: meta,
  type: ACTION_TYPES.GET_ROBOTS,
});
