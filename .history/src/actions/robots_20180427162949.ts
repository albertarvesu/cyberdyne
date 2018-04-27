import { IAppAction } from './';
import * as ACTION_TYPES from './../constants/actionTypes';

export interface IListMeta {
  offset: number;
  limit: number;
}

export const getRobots = (meta: IListMeta) => (
  {
    payload: meta,
    type: ACTION_TYPES.GET_ROBOTS,
  } as IAppAction
);
