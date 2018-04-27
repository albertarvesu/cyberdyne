import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getRobots, IGetRobots } from '../../actions/robots';

interface IQualityAssurance {
  getRobots: IGetRobots;
  history: any;
}

class QualityAssurance extends React.Component<IQualityAssurance> {

  public componentDidMount() {
    this.props.getRobots({});
  }

  public render () {
    
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = () => ({});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(QualityAssurance);