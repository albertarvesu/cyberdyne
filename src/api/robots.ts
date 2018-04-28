import * as urltemplate from 'url-template';
import { IListMeta } from "../actions/robots";
import { API_URL } from "../constants/api";
import { IRobot } from '../models';
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

export const extinguishRobot = (robot: IRobot) => {
  const url = `${API_URL}/robots/${robot.id}/extinguish.json`;
  return ajax(
    url,
    {
      method: 'POST',
    },
  );
};

export const recycleRobots = (robots: IRobot[]) => {
  const url = `${API_URL}/robots/recycle.json`;
  return ajax(
    url,
    {
      method: 'POST',
      body: JSON.stringify({
        recycleRobots: robots.map(robot => robot.id)
      }),
    },
  );
};

export default getRobots;