import * as nock from 'nock';
import { IRobot } from '../../models';
import { API_URL } from './../../constants/api';
import { extinguishRobot, getRobots, recycleRobots, shipRobots } from './../robots';

describe('testing API: getRobots', () => {

  it('API: getRobots with default meta', async () => {
    const expected = {
      data: [
        { id: 1, name: 'Robot1', configuration: { hasSentience: true, hasWheels: true, hasTracks: true, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire']} as IRobot
      ],
      status: 200,
    };
    nock(API_URL).get('/robots.json').reply(200, expected);
    const actual = await getRobots({});
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

describe('testing API: extinguishRobot', () => {

  it('API: extinguishRobot with robot param', async () => {
    const robot = {
      id: 1,
      name: 'Robot1',
      configuration: {
        hasSentience: true,
        hasWheels: true,
        hasTracks: true,
        numberOfRotors: 8,
        colour: 'red'
      },
      statuses: ['on fire']
    } as IRobot;
    const expected = {
      data: {
        id: 1,
        name: 'Robot1',
        configuration: {
          hasSentience: true,
          hasWheels: true,
          hasTracks: true,
          numberOfRotors: 8,
          colour: 'red'
        },
        statuses: ['on fire']
      } as IRobot,
      status: 200,
    };
    nock(API_URL).post('/robots/1/extinguish.json').reply(200, expected);
    const actual = await extinguishRobot(robot);
    expect(actual).toEqual(expected);
  });
});

describe('testing API: recycleRobots', () => {

  it('API: recycleRobots with robots param', async () => {
    const robots = [
      {
        id: 1,
        name: 'Robot1',
        configuration: {
          hasSentience: true,
          hasWheels: true,
          hasTracks: true,
          numberOfRotors: 8,
          colour: 'red'
        },
        statuses: ['on fire']
      } as IRobot,
      {
        id: 2,
        name: 'Robot2',
        configuration: {
          hasSentience: true,
          hasWheels: true,
          hasTracks: true,
          numberOfRotors: 8,
          colour: 'red'
        },
        statuses: ['on fire']
      } as IRobot
    ];
    const expected = {
      data: [1, 2],
      status: 200,
    };
    nock(API_URL).post('/robots/recycle.json').reply(200, expected);
    const actual = await recycleRobots(robots);
    expect(actual).toEqual(expected);
  });
});

describe('testing API: shipRobots', () => {

  it('API: shipRobots with robots param', async () => {
    const robots = [
      {
        id: 1,
        name: 'Robot1',
        configuration: {
          hasSentience: true,
          hasWheels: true,
          hasTracks: true,
          numberOfRotors: 8,
          colour: 'red'
        },
        statuses: ['on fire']
      } as IRobot,
      {
        id: 2,
        name: 'Robot2',
        configuration: {
          hasSentience: true,
          hasWheels: true,
          hasTracks: true,
          numberOfRotors: 8,
          colour: 'red'
        },
        statuses: ['on fire']
      } as IRobot
    ];
    const expected = {
      data: [1, 2],
      status: 200,
    };
    nock(API_URL).put('/shipments/create').reply(200, expected);
    const actual = await shipRobots(robots);
    expect(actual).toEqual(expected);
  });
});