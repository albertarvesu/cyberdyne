
import { shallow } from 'enzyme';
import * as React from 'react';
import './../../enzymeAdapter';

import { Table } from 'antd';
import { IRobot } from './../../models';
import { Shipping } from './Shipping';

const defaultProps = {
  isShipping: false,
  qualityRobots: [],
  shipRobots: () => {}, // tslint:disable-line:no-empty
  getRobots: () => {}, // tslint:disable-line:no-empty
};

const robots = [
  { id: 1, name: 'Robot1', configuration: { hasSentience: true, hasWheels: true, hasTracks: true, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire']} as IRobot,
  { id: 2, name: 'Robot2', configuration: { hasSentience: false, hasWheels: false, hasTracks: false, numberOfRotors: 8, colour: 'red' }, statuses: ['on fire'] } as IRobot,
  { id: 3, name: 'Robot3', configuration: { hasSentience: false, hasWheels: true, hasTracks: false, numberOfRotors: 8, colour: 'blue' }, statuses: ['on fire'] } as IRobot
];

describe('Testing <Shipping /> component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Shipping {...defaultProps} />);
    expect(wrapper.type()).toEqual('div');
    expect(wrapper.find(Table).length).toEqual(2);
  });
  it('should display three tables when selectedRobots is not empty', () => {
    const wrapper = shallow(<Shipping {...defaultProps} />);
    wrapper.setState({
      selectedRobots: robots
    });
    expect(wrapper.find(Table).length).toEqual(3);
  });
});