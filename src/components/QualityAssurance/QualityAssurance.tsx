import { Button, Divider, Popconfirm, Table } from 'antd';

import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { extinguishRobot, getRobots, IExtinguishRobot, IGetRobots, IRecycleRobots, recycleRobots } from '../../actions/robots';
import { IAppState, IRobot } from '../../models';
import { selectIsExtinguishing, selectIsRecycling, selectRobotsData } from './../../selectors/robots';
import { decorateCheckbox, isForExtinguishing } from './../../utils/robots';

interface IQAProps {
  isExtinguishing: boolean;
  isRecycling: boolean;
  robots: IRobot[],
  getRobots: IGetRobots;
  extinguishRobot: IExtinguishRobot,
  recycleRobots: IRecycleRobots,
  history: any;
}

interface IQAState {
  selectedRowKeys: number[];
  selectedRows: IRobot[];
}

export class QualityAssurance extends React.Component<IQAProps, IQAState> {

  columns: Array<{ dataIndex: string; title: string; render?: undefined; } | { title: string; dataIndex: string; render: (configuration: any, robot: any) => false | JSX.Element; }>;

  constructor(props: IQAProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onExtinguish = this.onExtinguish.bind(this);
    this.onRecycle = this.onRecycle.bind(this);
    this.onFinished = this.onFinished.bind(this);

    this.state = {
      selectedRowKeys: [],
      selectedRows: [],
    };

    this.columns = [
      {
        dataIndex: 'id',
        title: 'ID',
      },
      {
        dataIndex: 'name',
        title: 'Robot Name',
      },
      // {
      //   dataIndex: 'configuration.hasSentience',
      //   title: 'Sentience',
      //   render: (value: boolean) => value && <Icon type="check" />,
      // },
      // {
      //   dataIndex: 'configuration.hasWheels',
      //   title: 'Wheels',
      //   render: (value: boolean) => value && <Icon type="check" />,
      // },
      // {
      //   dataIndex: 'configuration.hasTracks',
      //   title: 'Tracks',
      //   render: (value: boolean) => value && <Icon type="check" />,
      // },
      // {
      //   dataIndex: 'configuration.numberOfRotors',
      //   title: 'Rotors',
      // },
      // {
      //   dataIndex: 'configuration.colour',
      //   title: 'Colour',
      // },
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
      },
      {
        title: 'Action',
        dataIndex: 'configuration',
        render: (configuration: any, robot: any,) => { 
          return (
            isForExtinguishing(robot) &&
            (
              // tslint:disable-next-line:jsx-no-lambda
              <Popconfirm title={`Sure to extinguish ${robot.name}?`} onConfirm={() => { this.onExtinguish(robot) }}>
                <Button size="small" type="danger">Extinguish</Button>
              </Popconfirm>
            )
          );
        }
      }
    ];
  }

  componentWillReceiveProps(nextProps: IQAProps) {
    if (!nextProps.isRecycling && (this.props.isRecycling !== nextProps.isRecycling)) {
      this.setState({
        selectedRowKeys: [],
        selectedRows: [],
      })
    }
  }

  componentDidMount() {
    this.props.getRobots({ offset: 0, limit: 1000 });
  }

  onChange(selectedRowKeys: number[], selectedRows: IRobot[]) {
    this.setState({ selectedRowKeys, selectedRows })
  }

  onExtinguish(robot: IRobot) {
    this.props.extinguishRobot(robot)
  }

  onRecycle() {
    this.props.recycleRobots(this.state.selectedRows);
  }

  onFinished() {
    this.props.history.push('/shipping');
  }

  render () {
    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onChange,
      getCheckboxProps: decorateCheckbox,
    };

    const hasSelected = selectedRowKeys.length > 0;

    const dataSource =  this.props.robots.map(robot => ({
      id: robot.id,
      key: robot.id,
      name: robot.name,
      configuration: robot.configuration,
      statuses: robot.statuses,
    }));

    return (
      <div className="wrapper">
        <div className="actions">
          <Popconfirm title="Sure to recycle?" onConfirm={this.onRecycle}>
            <Button
              type="primary"
              disabled={!hasSelected}
              loading={this.props.isRecycling}
            >
              Recycle {hasSelected && `${selectedRowKeys.length} robot(s)`}
            </Button>
          </Popconfirm>
          <h3>Quality Assurance</h3>
          <Popconfirm okText="Yes" title="Are you sure you have completed the QA process?" onConfirm={this.onFinished}>
            <Button>Finished</Button>
          </Popconfirm>
        </div>
        <Table rowSelection={rowSelection} dataSource={dataSource} columns={this.columns} />
      </div>
    )
  }
}

const mapStateToProps = (state: IAppState) => ({
  robots: selectRobotsData(state),
  isRecycling: selectIsRecycling(state),
  isExtinguishing: selectIsExtinguishing(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    extinguishRobot,
    getRobots,
    recycleRobots,
  })
)(QualityAssurance);