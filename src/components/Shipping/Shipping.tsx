import { Tabs } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IAppState, IRobot } from '../../models';
import { IShipRobots, shipRobots } from './../../actions/robots';
import { selectQualityRobots } from './../../selectors/robots';

export const RobotList = () => (<div>Hello</div>);

interface IShippingProps {
  qualityRobots: IRobot[];
  shipRobots: IShipRobots,
}

const TabPane = Tabs.TabPane;

export class Shipping extends React.Component<IShippingProps> {
  render () {
    return (
      <div className="wrapper">
        <div className="actions center">
          <h3>Shipping</h3>
        </div>
        <Tabs>
          <TabPane tab="Factory seconds" key="1">
            <RobotList />
          </TabPane>
          <TabPane tab="Passed QA" key="2">
            <RobotList />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state: IAppState) => ({
  qualityRobots: selectQualityRobots(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    shipRobots,
  })
)(Shipping);