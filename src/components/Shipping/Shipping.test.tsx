
import { shallow } from 'enzyme';
import * as React from 'react';
import './../../enzymeAdapter';

import { Shipping } from './Shipping';

const defaultProps = {
  qualityRobots: [],
  shipRobots: () => {}, // tslint:disable-line:no-empty
};

describe('Testing <Shipping /> component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Shipping {...defaultProps} />);
    expect(wrapper.type()).toEqual('div');
  });
});