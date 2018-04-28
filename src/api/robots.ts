import * as urltemplate from 'url-template';
import { IListMeta } from "../actions/robots";
import { API_URL } from "../constants/api";
import ajax from './ajax';

export const getRobots = ({ offset = null, limit = null }: IListMeta) => {
  const url = urltemplate
    .parse('{+API_URL}/robots.json{?offset,limit}')
    .expand({
      API_URL,
      offset,
      limit,
    });
  return ajax(
    url,
    {
      method: 'GET',
    },
  );
};

export default getRobots;