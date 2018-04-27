import { IListMeta } from "../actions/robots";
import { API_URL } from "../constants/api";
import ajax from './ajax';

export const getRobots = (meta: IListMeta) => {
  const url = `${API_URL}/robots.json`;
  return ajax(
    url,
    {
      method: 'GET',
    },
  );
};

export default getRobots;