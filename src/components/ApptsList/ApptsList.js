import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import {Paper} from '@material-ui/core';

import { fetchScheduleGen, fetchAppts, editAppt } from '../../actions/actions';
import arraySortByProp from '../../utils/arraySortByProp';
import Search from '../UI/Search';
import Filter from './ApptsListFilter';
import SelectableButton from '../UI/SelectableButton';
import ApptsListLine from './ApptsListLine';

const styleSheet = (theme) => ({
  Container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(1),
    
  },
  Item: {
    paddingBottom: theme.spacing(0.5),
    '&:not(:last-child)': {
      paddingRight: theme.spacing(1),
    },
  },
  ML: {
    marginLeft: 'auto',
  },
  paper: {
    paddingLeft: theme.spacing(1),
  }
});

class ApptsList extends Component {
  state = {
    search: {
      value: '',
      empty: true,
    },
    filterId: 'all',
    filterThresh: new Date().toISOString().slice(0, 10),
  };

  changeFilterHandler = (e, btnId) => {
    if (btnId === this.state.filterId) return;
    this.changeSearchHandler('');
    this.setState((prevState) => {
      if (prevState.filterId === btnId) return null;
      return {
        filterId: btnId,
      };
    });
  };

  changeSearchHandler = (refined) => {
    const search = { ...this.state.search };
    search.value = refined;
    search.empty = !Boolean(refined.length);

    this.setState((prevState) => {
      if (prevState.search.value === search.value) return null;
      return {
        search,
      };
    });
  };

  editApptHandler = (e, apptId) => {
    /** (1) updating redux state for edit appt
     * (2) navigating to apptEditor
     */
    const appt = this.props.appts.find((item) => item.apptId === apptId);
    const apptEdited = {
      doctorId: appt.doctorId,
      apptId: apptId,
      docDateTime: appt.docDateTime,
      initialStage: 'schedule',
    };
    this.props.editAppt(apptEdited);
    this.props.history.push('/apptEditor');
  };

  deleteApptHandler = (apptId) => {
    let apptToDeleteIndex;
    const apptToDelete = this.props.appts.find((item, index) => {
      if (item.apptId === apptId) {
        apptToDeleteIndex = index;
        return true;
      }
    });
    const appts = [
      ...this.props.appts.slice(0, apptToDeleteIndex),
      ...this.props.appts.slice(apptToDeleteIndex + 1),
    ];

    const scheduleGen = [...this.props.scheduleGen];

    this.props.scheduleGen.forEach((item, index) => {
      if (item.docDateTime === apptToDelete.docDateTime) {
        const newSchGenItem = { ...item, available: true };
        scheduleGen[index] = newSchGenItem;
      }
    });
    this.props.fetchAppts(arraySortByProp(appts, 'dateTime', 'desc'));
    this.props.fetchScheduleGen(scheduleGen);
    return apptToDelete;
  };

  render() {
    let searchDisabled = false,
      contents,
      filteredList;

    if (this.props.appts.length === 0) {
      searchDisabled = true;
      contents = 'Записи отстутствуют';
    } else {
      filteredList = this.props.appts.filter((item) => {
        let result = true;
        if (this.state.filterId === 'all') result = true && result;
        if (this.state.filterId === 'active')
          result = item.dateTime > this.state.filterThresh && result;
        if (this.state.filterId === 'past')
          result = item.dateTime < this.state.filterThresh && result;
        if (this.state.search.value !== '')
          result =
            item.searchString.includes(this.state.search.value.toLowerCase()) &&
            result;
        return result;
      });
      if (filteredList.length === 0) {
        contents = 'Записи с заданными условиями отсутствуют';
      } else {
        contents = filteredList.map((item) => {
          return (
            <ApptsListLine
              key={item.docDateTime}
              appt={item}
              showButtons={true}
              deleteApptHandler={this.deleteApptHandler}
              editApptHandler={this.editApptHandler}
              apptStatus={
                item.dateTime > this.state.filterThresh ? 'Active' : 'Past'
              }
            />
          );
        });
      }
    }
    return (
      <Fragment>
        <div className={this.props.classes.Container}>
          <Filter
            renderButtons={(btnId, btnName) => (
              <div key={btnId} className={this.props.classes.Item}>
                <SelectableButton
                  size='small'
                  variant='outlined'
                  color='primary'
                  selected={btnId === this.state.filterId}
                  onClick={(e) => this.changeFilterHandler(e, btnId)}
                >
                  {btnName}
                </SelectableButton>
              </div>
            )}
            filterId={this.state.filterId}
          />
          <div className={clsx(this.props.classes.Item, this.props.classes.ML)}>
            <Search
              id='search_in_apptsList'
              value={this.state.search.value}
              placeholder='Буквы русского алфавита, пробел'
              disabled={searchDisabled}
              helperText={
                this.state.search.empty
                  ? null
                  : 'Буквы русского алфавита, пробел'
              }
              label='ФИО / специальность'
              changeSearchHandler={this.changeSearchHandler}
            />
          </div>
        </div>

        <Paper className={this.props.classes.paper}>{contents}</Paper>
      </Fragment>
    );
  }
}

const StyledApptsList = withStyles(styleSheet)(ApptsList);

ApptsList.propTypes = {
  appts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    appts: state.appts || [],
    scheduleGen: state.scheduleGen,
  };
};

const mapDispatchToProps = {
  fetchScheduleGen,
  fetchAppts,
  editAppt,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledApptsList);
