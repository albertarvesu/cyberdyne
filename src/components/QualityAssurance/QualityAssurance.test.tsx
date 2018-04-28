import { shallow } from 'enzyme';
import * as React from 'react';
import './../../enzymeAdapter';
import { QualityAssurance } from './QualityAssurance';

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