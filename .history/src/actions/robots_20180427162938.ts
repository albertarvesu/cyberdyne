import * as ACTION_TYPES from './../constants/actionTypes';
import { IAppAction } from './';

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
