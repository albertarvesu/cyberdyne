import { IListMeta } from "../actions/robots";
import { API_URL } from "../constants/api";
import ajax from './ajax';

export const getRobots = (meta: IListMeta = { offset: 0, limit: 1000 }) => {
  const url = `${API_URL}/robots.json?offset=${meta.offset}&limit=${meta.limit}`;
  return ajax(
    url,
    {
      method: 'GET',
    },
  );
};

export default getRobots;