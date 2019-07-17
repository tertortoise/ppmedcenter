import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { CssBaseline } from '@material-ui/core';

import { fetchAppts, fetchScheduleGen } from './actions/actions';
import dataApptsProc from './data/dataAppts';
import dataScheduleProc from './data/dataScheduleProc';
import arraySortByProp from './utils/arraySortByProp';

import Layout from './components/Layout/Layout';
import Dash from './components/Dash/Dash';
import ApptEditor from './components/Appts/ApptEditor';
import ApptsList from './components/ApptsList/ApptsList';
import Personal from './components/Personal/Personal';

class App extends Component {
  componentDidMount() {
    this.props.fetchAppts(arraySortByProp(dataApptsProc, 'dateTime', 'desc'));
    this.props.fetchScheduleGen(dataScheduleProc);
  }

  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Layout>
          <Switch>
            <Route path='/ppmedcenter' exact component={Dash} />
            <Route
              path='/apptEditor'
              component={ApptEditor}
            />
            <Route
              path='/apptsList'
              component={ApptsList}
            />
            <Route
              path='/personal'
              component={Personal}
            />
          </Switch>
        </Layout>
      </Fragment>

    );
  }
}

const mapDispatchToProps = {
  fetchAppts,
  fetchScheduleGen,
};

export default connect(
  undefined,
  mapDispatchToProps
)(App);
