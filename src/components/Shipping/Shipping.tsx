import { Button, Divider, Icon, message, Popconfirm, Table, Tabs } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IAppState, IRobot } from '../../models';
import { getRobots, IGetRobots, IShipRobots, shipRobots } from './../../actions/robots';
import { selectIsShipping, selectQualityRobots } from './../../selectors/robots';

interface IShippingProps {
  isShipping: boolean;
  qualityRobots: IRobot[];
  shipRobots: IShipRobots;
  getRobots: IGetRobots;
}

interface IShippingState {
  listedRobots: IRobot[],
  selectedRobots: IRobot[], 
}

const TabPane = Tabs.TabPane;

const isFactorySecond = (robot: IRobot): boolean => robot.statuses.length > 1;

const hasPassedQA = (robot: IRobot): boolean => robot.statuses.length === 0;

const robotToRow = (robot: IRobot): object => ({
  id: robot.id,
  key: robot.id,
  name: robot.name,
  configuration: robot.configuration,
  statuses: robot.statuses,
});

const sortRobots = (a: IRobot, b: IRobot) => a.id - b.id;

export class Shipping extends React.Component<IShippingProps, IShippingState> {
  
  columns: Array<{ dataIndex: string; title: string; render?: undefined; } | { dataIndex: string; title: string; render: (value: boolean) => false | JSX.Element; } | { dataIndex: string; title: string; render: (statuses: string[], record: any) => JSX.Element; }>;
  
  constructor(props: IShippingProps) {
    super(props);

    this.state = {
      listedRobots: props.qualityRobots,
      selectedRobots: [],
    }

    this.onAddToShipment = this.onAddToShipment.bind(this);
    this.onRemoveFromShipment = this.onRemoveFromShipment.bind(this);
    this.onShipRobots = this.onShipRobots.bind(this);

    this.columns = [
      {
        dataIndex: 'id',
        title: 'ID',
      },
      {
        dataIndex: 'name',
        title: 'Robot Name',
      },
      {
        dataIndex: 'configuration.hasSentience',
        title: 'Sentience',
        render: (value: boolean) => value && <Icon type="check" />,
      },
      {
        dataIndex: 'configuration.hasWheels',
        title: 'Wheels',
        render: (value: boolean) => value && <Icon type="check" />,
      },
      {
        dataIndex: 'configuration.hasTracks',
        title: 'Tracks',
        render: (value: boolean) => value && <Icon type="check" />,
      },
      {
        dataIndex: 'configuration.numberOfRotors',
        title: 'Rotors',
      },
      {
        dataIndex: 'configuration.colour',
        title: 'Colour',
      },
      {
        dataIndex: 'statuses',
        title: 'Statuses',
        render: (statuses: string[], record: any) => (
          <React.Fragment>
            {statuses.map((status: string, index: number, entire: string[]) => {
              return (
                <React.Fragment key={status}>
                  <span>{status}</span>
                  {entire.length > 1 && index !== entire.length - 1 && <Divider type="vertical" />}
                </React.Fragment>
              )
            })}
          </React.Fragment>
        ),
      }
    ];
  }

  componentDidMount() {
    if (this.props.qualityRobots.length === 0) {
      this.props.getRobots({ offset: 0, limit: 1000 });
    }
  }

  componentWillReceiveProps(nextProps: IShippingProps) {
    if (this.props.qualityRobots !== nextProps.qualityRobots) {
      this.setState({
        listedRobots: nextProps.qualityRobots,
      });
    }
    if (!nextProps.isShipping && (this.props.isShipping !== nextProps.isShipping)) {
      this.setState({
        selectedRobots: [],
      });
      message.success('Congratulations. You have successfully shipped the robots.', 3);
    }
  }

  onAddToShipment(robot: IRobot) {
    this.setState(prevState => ({
      selectedRobots: prevState.selectedRobots.concat(robot),
      listedRobots: prevState.listedRobots.filter(listed => listed.id !== robot.id)
    }));
  }

  onRemoveFromShipment(robot: IRobot) {
    this.setState(prevState => ({
      selectedRobots: prevState.selectedRobots.filter(listed => listed.id !== robot.id),
      listedRobots: prevState.listedRobots.concat(robot)
    }));
  }

  onShipRobots() {
    this.props.shipRobots(this.state.selectedRobots);
  }

  render () {
    const addColumn = {
      title: 'Action',
      dataIndex: 'configuration',
      render: (configuration: any, robot: any,) => {
        return (
          // tslint:disable-next-line:jsx-no-lambda
          <Button onClick={() => { this.onAddToShipment(robot) }} size="small">
            Add to shipment
          </Button>
        );
      }
    };

    const removeColumn = {
      title: 'Action',
      dataIndex: 'configuration',
      render: (configuration: any, robot: any,) => {
        return (
          // tslint:disable-next-line:jsx-no-lambda
          <Popconfirm title={`Sure to remove ${robot.name}?`} onConfirm={() => { this.onRemoveFromShipment(robot) }}>
            <Button type="danger" size="small">
              Remove from shipment
            </Button>
          </Popconfirm>
        );
      }
    };

    const factorySecondsRobots = this.state.listedRobots.filter(isFactorySecond).sort(sortRobots);
    const passedQARobots = this.state.listedRobots.filter(hasPassedQA).sort(sortRobots);
    const selectedRobots = this.state.selectedRobots.sort(sortRobots);

    return (
      <div className="wrapper">
        <div className="actions">
          <Link to="/">
          <Icon type="left" /> Quality Assurance
          </Link>
          <h3>Shipping</h3>
          <span>&nbsp;</span>
        </div>
        <Tabs>
          <TabPane tab={`Factory seconds (${factorySecondsRobots.length})`} key="1">
            <Table columns={[...this.columns, addColumn]} dataSource={factorySecondsRobots.map(robotToRow)} />
          </TabPane>
          <TabPane tab={`Passed QA (${passedQARobots.length})`} key="2">
            <Table columns={[...this.columns.slice(0, -1), addColumn]} dataSource={passedQARobots.map(robotToRow)} />
          </TabPane>
        </Tabs>
        {this.state.selectedRobots.length > 0 && (
          <React.Fragment>
            <h1>Ready for Shipment ({selectedRobots.length})</h1>
            <Table columns={[...this.columns, removeColumn]} dataSource={selectedRobots.map(robotToRow)} />
            <Popconfirm title={`Please confirm that you're ready for this shipment?`} onConfirm={this.onShipRobots}>
              <Button loading={this.props.isShipping} type="primary" icon="play-circle" size="large">Send shipment</Button>
            </Popconfirm>
          </React.Fragment>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state: IAppState) => ({
  qualityRobots: selectQualityRobots(state),
  isShipping: selectIsShipping(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getRobots,
    shipRobots,
  })
)(Shipping);