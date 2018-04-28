import { shallow } from 'enzyme';
import * as React from 'react';
import './../../enzymeAdapter';

import { IRobot } from '../../models';
import { decorateCheckbox, isForExtinguishing, isForRecycling, QualityAssurance } from './QualityAssurance';

const defaultProps = {
  extinguishRobot: () => {}, // tslint:disable-line:no-empty
  getRobots: () => {}, // tslint:disable-line:no-empty
  history: {},
  robots: [],
  isRecycling: false,
  isExtinguishing: false,
  recycleRobots: () => {}, // tslint:disable-line:no-empty
}

describe('Testing <QualityAssurance /> component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<QualityAssurance {...defaultProps} />);
    expect(wrapper.type()).toEqual('div');
  });
});

describe('Testing isForRecycling function', () => {
  it('Testing: Robot not for recyling', () => {
    const result = isForRecycling(
      {
        id: 1,
        name: 'Robot1',
        configuration: {
          hasSentience: false,
          hasWheels: false,
          hasTracks: false,
          numberOfRotors: 5,
          colour: 'red'
        },
        statuses: ['loose screws']
      } as IRobot
    );
    expect(result).toEqual(false);
  });


  it('Testing: Has fewer than 3 rotors', () => {
    const result = isForRecycling(
      {
        id: 1,
        name: 'Robot1',
        configuration: {
          hasSentience: false,
          hasWheels: false,
          hasTracks: false,
          numberOfRotors: 2,
          colour: 'red'
        },
        statuses: []
      } as IRobot
    );
    expect(result).toEqual(true);
  });

  it('Testing: Has more than 8 rotors', () => {
    const result = isForRecycling(
      {
        id: 1,
        name: 'Robot1',
        configuration: {
          hasSentience: false,
          hasWheels: false,
          hasTracks: false,
          numberOfRotors: 10,
          colour: 'red'
        },
        statuses: []
      } as IRobot
    );
    expect(result).toEqual(true);
  });

  it('Testing: Has any number of rotors and blue in colour', () => {
    const result = isForRecycling(
      {
        id: 1,
        name: 'Robot1',
        configuration: {
          hasSentience: false,
          hasWheels: false,
          hasTracks: false,
          numberOfRotors: 5,
          colour: 'blue'
        },
        statuses: ['loose screws']
      } as IRobot
    );
    expect(result).toEqual(true);
  });

  it('Testing: Has both wheels and tracks', () => {
    const result = isForRecycling(
      {
        id: 1,
        name: 'Robot1',
        configuration: {
          hasSentience: false,
          hasWheels: true,
          hasTracks: true,
          numberOfRotors: 5,
          colour: 'red'
        },
        statuses: ['loose screws']
      } as IRobot
    );
    expect(result).toEqual(true);
  });

  it('Testing: Has wheels and is rusty', () => {
    const result = isForRecycling(
      {
        id: 1,
        name: 'Robot1',
        configuration: {
          hasSentience: false,
          hasWheels: true,
          hasTracks: false,
          numberOfRotors: 5,
          colour: 'red'
        },
        statuses: ['rusty']
      } as IRobot
    );
    expect(result).toEqual(true);
  });

  it('Testing: Is sentient and has screws loose', () => {
    const result = isForRecycling(
      {
        id: 1,
        name: 'Robot1',
        configuration: {
          hasSentience: true,
          hasWheels: false,
          hasTracks: false,
          numberOfRotors: 5,
          colour: 'red'
        },
        statuses: ['loose screws']
      } as IRobot
    );
    expect(result).toEqual(true);
  });

  it('Testing: Is on fire', () => {
    const result = isForRecycling(
      {
        id: 1,
        name: 'Robot1',
        configuration: {
          hasSentience: false,
          hasWheels: false,
          hasTracks: false,
          numberOfRotors: 5,
          colour: 'red'
        },
        statuses: ['on fire']
      } as IRobot
    );
    expect(result).toEqual(true);
  });

});

describe('Testing isForExtinguishing function', () => {
  it('Should be for extinguishing if sentient and is on fire', () => {
    const result = isForExtinguishing(
      {
        id: 1,
        name: 'Robot1',
        configuration: {
          hasSentience: true,
          hasWheels: false,
          hasTracks: false,
          numberOfRotors: 5,
          colour: 'red'
        },
        statuses: ['on fire']
      } as IRobot
    );
    expect(result).toEqual(true);
  });
  it('Should not be for extinguishing if not sentient or is on fire', () => {
    const result = isForExtinguishing(
      {
        id: 1,
        name: 'Robot1',
        configuration: {
          hasSentience: true,
          hasWheels: false,
          hasTracks: false,
          numberOfRotors: 5,
          colour: 'red'
        },
        statuses: []
      } as IRobot
    );
    expect(result).toEqual(false);
  });
});

describe('Testing checkbox', () => {
  it('Checkbox should be disabled if robot is not for recycling', () => {
    const actual = decorateCheckbox(
      {
        id: 1,
        name: 'Robot1',
        configuration: {
          hasSentience: false,
          hasWheels: false,
          hasTracks: false,
          numberOfRotors: 5,
          colour: 'red'
        },
        statuses: []
      } as IRobot
    );
    const expected = { disabled: true };
    expect(actual).toEqual(expected);
  });
  it('Checkbox should be disabled if robot is extinguishing', () => {
    const actual = decorateCheckbox(
      {
        id: 1,
        name: 'Robot1',
        configuration: {
          hasSentience: true,
          hasWheels: false,
          hasTracks: false,
          numberOfRotors: 5,
          colour: 'red'
        },
        statuses: ['on fire']
      } as IRobot
    );
    const expected = { disabled: true };
    expect(actual).toEqual(expected);
  });
});