import * as nock from 'nock';
import { IRobot } from '../../models';
import { API_URL } from './../../constants/api';
import { getRobots } from './../robots';

describe('testing API: robots', () => {
  it('API: getRobots with default meta', async () => {
    const expected = {
      data: [
        { id: 1, name: 'Robot1', configuration: { hasSentience: true, hasWheels: true, hasTracks: true, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire']} as IRobot
      ],
      status: 200,
    };
    nock(API_URL).get('/robots.json?offset=0&limit=1000').reply(200, expected);
    const actual = await getRobots();
    expect(actual).toEqual(expected);
  });
  it('API: getRobots with meta', async () => {
    const expected = {
      data: [
        { id: 1, name: 'Robot1', configuration: { hasSentience: true, hasWheels: true, hasTracks: true, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire']} as IRobot
      ],
      status: 200,
    };
    nock(API_URL).get('/robots.json?offset=1&limit=100').reply(200, expected);
    const actual = await getRobots({ offset: 1, limit: 100 });
    expect(actual).toEqual(expected);
  });
});