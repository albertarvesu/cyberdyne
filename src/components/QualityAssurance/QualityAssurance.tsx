import { Button, Divider, Icon, Table } from 'antd';
import { includes } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getRobots, IGetRobots } from '../../actions/robots';
import { ERobotStatus, IAppState, IRobot } from '../../models';
import { selectRobotsData } from './../../selectors/robots';

interface IQAProps {
  robots: IRobot[],
  getRobots: IGetRobots;
  history: any;
}

interface IQAState {
  selectedRowKeys: number[];
}

export const isForRecycling = (robot: IRobot): boolean => {
  const config = robot.configuration;

  // Has fewer than 3 or greater than 8 rotors
  const hasInCorrectNumOfRotors = config.numberOfRotors < 3 || config.numberOfRotors > 8;

  // Has any number of rotors and blue in colour
  const hasRotorsAndBlue = config.numberOfRotors > 0 && config.colour === 'blue';

  // Has both wheels and tracks
  const hasBothWheelsAndTracks = config.hasWheels && config.hasTracks;

  // Has wheels and is rusty
  const hasWheelsAndRusty = config.hasWheels && includes(robot.statuses, ERobotStatus.RUSTY);

  // Is sentient and has screws loose
  const hasSentienceAndLooseScrews = config.hasSentience && includes(robot.statuses, ERobotStatus.LOOSE_SCREWS);

  // Is on fire
  const isOnFire = includes(robot.statuses, ERobotStatus.ONFIRE);

  return [
    hasInCorrectNumOfRotors,
    hasRotorsAndBlue,
    hasBothWheelsAndTracks,
    hasWheelsAndRusty,
    hasSentienceAndLooseScrews,
    isOnFire
  ].some(check => check);
};

export const isForExtinguishing = (robot: IRobot): boolean =>
  robot.configuration.hasSentience &&includes(robot.statuses, ERobotStatus.ONFIRE);

export const decorateCheckbox = (robot: IRobot): object => ({
  // Robots that is ready for the next stage should have their checkbox disabled
  disabled: !isForRecycling(robot) || isForExtinguishing(robot),
});

const QAColums = [
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
  },
  {
    title: 'Action',
    dataIndex: 'configuration',
    render: (configuration: any, robot: any) => isForExtinguishing(robot) && <Button size="small" type="danger">Extinguish</Button>
  }
];

export class QualityAssurance extends React.Component<IQAProps, IQAState> {
  constructor(props: IQAProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      selectedRowKeys: [],
    }
  }

  onChange(selectedRowKeys: number[]) {
    this.setState({ selectedRowKeys })
  }

  componentDidMount() {
    this.props.getRobots();
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
      key: robot.id,
      name: robot.name,
      configuration: robot.configuration,
      statuses: robot.statuses,
    }));

    return (
      <div className="wrapper">
        <div className="actions">
          <Button
            type="primary"
            disabled={!hasSelected}
            loading={false}
          >
            Recycle {hasSelected && `${selectedRowKeys.length} robot(s)`}
          </Button>
        </div>
        <Table rowSelection={rowSelection} dataSource={dataSource} columns={QAColums} />
      </div>
    )
  }
}

const mapStateToProps = (state: IAppState) => ({
  robots: selectRobotsData(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getRobots
  })
)(QualityAssurance);