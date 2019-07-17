import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/styles';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { Button as ButtonMUI, IconButton } from '@material-ui/core';

import { fetchScheduleGen, fetchAppts, editAppt } from '../../actions/actions';
import ApptProgress from './ApptProgress';
import ApptSpecialities from './ApptSpecialities';
import ApptDoctors from './ApptDoctors';
import ApptSpecSwitch from './ApptSpecSwitch';
import ApptSchedule from './ApptSchedule';
import ApptConfirm from './ApptConfirm';
import Search from '../UI/Search';
import Spinner from '../UI/Spinner';
import arraySortByProp from '../../utils/arraySortByProp';
import dataSpecialities from '../../data/dataSpecialities';
import dataDoctors from '../../data/dataDoctors';

const styleSheet = (theme) => ({
  MB1: {
    marginBottom: theme.spacing(0.5),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  Search: {
    marginLeft: 'auto',
  },
  MB2: {
    //next and prev buttons - sticky above footer
    position: 'sticky',
    bottom: theme.spacing(1),
    display: 'flex',
    margin: '0 auto',
    width: '80%',
    color: '#f42ab5',
  },
  BtnForw: {
    marginLeft: 'auto',
  },
  BtnBack: {},
});

class ApptEditor extends Component {
  state = {
    stages: {
      specialities: {
        next: 'schedule',
      },
      doctors: {
        next: 'schedule',
      },
      schedule: {
        next: 'confirm',
        prev: 'specialities',
      },
      confirm: {
        prev: 'schedule',
        next: 'confirmed',
      },
      confirmed: {
        next: 'specialities',
      },
    },
    activeStage: {
      type: this.props.activeStage,
      btnNameNext: 'Далее',
      next: !!this.props.SpecialityId, //ok to go to next stage
      prev: true, //ok to go one stage back
    },
    search: {
      value: '',
      empty: true,
      disabled: true,
    },
    prevApptId: this.props.prevApptId, //string
    doctorId: [this.props.doctorId], //Array - maybe two doctors
    specialityId: this.props.SpecialityId, //string
    docDateTime: this.props.docDateTime, //string 'd001 2018-09-05 18:20'
    loading: true,
    specialities: undefined, //map see docs
    doctors: undefined, //map see docs
    schedule: undefined, //map for selected doctors see docs
    newAppt: undefined, //object undefined up until confirm-confirmed, then is a new/updated element of appts
  };

  changeSearchHandler = (refined) => {
    const search = { ...this.state.search };
    search.value = refined;
    search.empty = !Boolean(refined.length);
    /** refining Map for searched */
    let newMap = new Map(this.state[this.state.activeStage.type]);
    let currId;
    let activeStage;
    if (this.state.activeStage.type === 'specialities') {
      currId = this.state.specialityId;
      ({ newMap, currId, activeStage } = this.searchProcessor(
        newMap,
        currId,
        refined
      ));
      this.setState({
        specialities: newMap,
        specialityId: currId,
        activeStage,
        search,
      });
    } else if (this.state.activeStage.type === 'doctors') {
      currId = this.state.doctorId[0];
      ({ newMap, currId, activeStage } = this.searchProcessor(
        newMap,
        currId,
        refined
      ));
      const doctorId = [currId];
      this.setState({
        doctors: newMap,
        doctorId,
        activeStage,
        search,
      });
    }
  };

  searchProcessor(newMap, currId = undefined, term = '') {
    const searchTerm = term.toLowerCase();
    newMap.forEach((el, key) => {
      if (searchTerm.length === 0 || el.searchString.indexOf(searchTerm) > -1) {
        if (el.visible === false) {
          const newEl = { ...el, visible: true };
          newMap.set(key, newEl);
        }
      } else if (el.visible === true) {
        /** change el visibility to false */
        const newEl = { ...el, visible: false };
        if (currId === key) {
          currId = undefined;
          newEl.selected = false;
        }
        newMap.set(key, newEl);
        /** if element was selected and gets out of search scope - undefine it */
      }
    });

    const activeStage = { ...this.state.activeStage, next: !!currId };
    return {
      newMap,
      currId,
      activeStage,
    };
  }

  selectHandler = (e, id) => {
    let newMap = new Map(this.state[this.state.activeStage.type]);
    let newId = id;
    let activeStage, prevId;
    switch (this.state.activeStage.type) {
      case 'specialities':
        prevId = this.state.specialityId;
        ({ newMap, newId, activeStage } = this.selectProcessor(
          newMap,
          newId,
          prevId
        ));
        this.setState({
          specialities: newMap,
          specialityId: newId,
          activeStage,
        });
        break;
      case 'doctors':
        prevId = this.state.doctorId[0];
        ({ newMap, newId, activeStage } = this.selectProcessor(
          newMap,
          newId,
          prevId
        ));
        const doctorId = [newId];
        this.setState({
          doctors: newMap,
          doctorId,
          activeStage,
        });
        break;
      case 'schedule':
        prevId = this.state.docDateTime;
        ({ newMap, newId, activeStage } = this.selectProcessor(
          newMap,
          newId,
          prevId
        ));
        const docDateTime = newId;
        this.setState({
          schedule: newMap,
          docDateTime,
          activeStage,
        });
        break;

      default:
        return;
    }
  };

  selectProcessor(newMap, newId, prevId) {
    const currItem = newMap.get(newId);
    newMap.set(newId, {
      ...currItem,
      selected: !currItem.selected,
    });

    if (prevId === newId) {
      newId = undefined;
    } else if (prevId !== undefined && prevId !== newId) {
      const prevSpec = newMap.get(prevId);
      newMap.set(prevId, {
        ...prevSpec,
        selected: false,
      });
    }
    const activeStage = { ...this.state.activeStage, next: !!newId };
    return {
      newMap,
      newId,
      activeStage,
    };
  }

  stageChangeHandler = (e, nextStage) => {
    e.stopPropagation();
    let newMap;
    let prevApptId = this.state.prevApptId;
    let schedule = undefined;
    let specialityId = this.state.specialityId;
    let doctorId = [...this.state.doctorId];
    let specialities = this.state.specialities;
    let doctors = this.state.doctors;
    let docDateTime = this.state.docDateTime;
    let newAppt = undefined;
    const search = { ...this.state.search, empty: true, value: '' };
    const activeStage = {
      ...this.state.activeStage,
      next: false,
      type: nextStage,
    };
    /** if current stage is specialities or doctors - clean up maps from selected and not visible items
     * On schedule stage we do not retain schedule map moving to the next stage
     * If schedule is next stage (regardless of previous) we take doctorId array and recreate it
     */
    if (
      this.state.activeStage.type === 'specialities' ||
      this.state.activeStage.type === 'doctors' ||
      this.state.activeStage.type === 'schedule'
    ) {
      newMap = new Map(this.state[this.state.activeStage.type]);
      newMap.forEach((el, key) => {
        if (el.visible === false) {
          const newEl = { ...el, visible: true };
          newMap.set(key, newEl);
        }
        if (el.selected === true) {
          const newEl = { ...el, selected: false };
          newMap.set(key, newEl);
        }
      });
    }
    if (this.state.activeStage.type === 'specialities') {
      specialities = newMap;
      if (nextStage === 'doctors') {
        specialityId = undefined;
      }
    }
    if (this.state.activeStage.type === 'doctors') {
      doctors = newMap;
      if (nextStage === 'specialities') {
        doctorId = [undefined];
      }
    }

    if (this.state.activeStage.type === 'schedule') {
      schedule = newMap;
      if (nextStage === 'specialities') {
        /** emptying selected doctors and reversing schedule map to default */
        doctorId = [undefined];
      }
      if (nextStage === 'confirm') {
        activeStage.next = true;
      }
    }

    if (
      this.state.activeStage.type === 'confirm' ||
      this.state.activeStage.type === 'confirmed'
    ) {
      activeStage.next = true;
      if (nextStage === 'specialities') {
        activeStage.next = false;
        docDateTime = undefined;
        doctorId = [undefined];
      }
      if (nextStage === 'confirmed') {
        newAppt = this.updateSchedule();
        doctorId = [undefined];
        prevApptId = undefined;
        docDateTime = undefined;
      }
    }
    /** if next stage - schedule, regardless of previous stage, create schedule map based on doctorId */
    if (nextStage === 'schedule') {
      activeStage.next = false;
      docDateTime = undefined;
      /** handling case: specialityId is present and doctorId is empty */
      if (!doctorId[0]) {
        doctorId = [];
        this.state.doctors.forEach((docInfo, docId) => {
          if (specialityId === docInfo.speciality) {
            doctorId.push(docId);
          }
        });
        specialityId = undefined;
      }
      schedule = this.makeSchedule(doctorId);
    }
    this.setState({
      activeStage,
      specialityId,
      doctorId,
      doctors,
      specialities,
      search,
      schedule,
      docDateTime,
      prevApptId,
      newAppt,
    });
  };

  makeSchedule(doctorId) {
    const schedule = new Map();
    this.props.scheduleGen.forEach((item) => {
      for (const doc of doctorId) {
        if (item.doctorId === doc && item.available) {
          const datetime = moment(item.docDateTime.slice(5));
          schedule.set(item.docDateTime, {
            doctorId: item.doctorId,
            date: datetime.format('YYYY-MM-DD'),
            time: datetime.format('HH:mm'),
            selected: false,
          });
        } else continue;
      }
    });
    return schedule;
  }

  updateSchedule() {
    /** changing  */
    const appts = [...this.props.appts];
    const scheduleGen = [...this.props.scheduleGen];
    const docId = this.state.schedule.get(this.state.docDateTime).doctorId;
    let prevDocDateTime, newApptId;

    let newAppt = {
      doctorId: docId,
      speciality: this.state.specialities.get(
        this.state.doctors.get(docId).speciality
      ).title,
      docFullName: this.state.doctors.get(docId).fullName,
      dateTime:
        this.state.schedule.get(this.state.docDateTime).date +
        ' ' +
        this.state.schedule.get(this.state.docDateTime).time,
      date: this.state.schedule.get(this.state.docDateTime).date,
      time: this.state.schedule.get(this.state.docDateTime).time,
      docDateTime: this.state.docDateTime,
      searchString:
        this.state.doctors.get(docId).fullName.toLowerCase() +
        ' ' +
        this.state.specialities
          .get(this.state.doctors.get(docId).speciality)
          .title.toLowerCase(),
    };
    if (this.state.prevApptId) {
      //modify edited appt and sort appts
      newAppt.apptId = this.state.prevApptId;
      this.props.appts.forEach((item, index) => {
        if (item.apptId === this.state.prevApptId) {
          prevDocDateTime = item.docDateTime;
          appts[index] = newAppt;
        }
      });
      this.props.fetchAppts(arraySortByProp(appts, 'dateTime', 'desc'));
      newApptId = this.state.prevApptId;
    } else {
      //make new appt, add to appts and sort appts
      do {
        newApptId = Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, '0');
      } while (appts.find((item) => item.apptId === newApptId));

      // while (true) {
      //   newApptId = Math.floor(Math.random() * 1000000)
      //     .toString()
      //     .padStart(6, '0');
      //   if (!appts.find((item) => item.apptId === newApptId)) break;
      // }
      newAppt.apptId = newApptId;
      appts.push(newAppt);
      this.props.fetchAppts(arraySortByProp(appts, 'dateTime', 'desc'));
    }

    this.props.scheduleGen.forEach((item, index) => {
      if (prevDocDateTime) {
        if (item.docDateTime === prevDocDateTime) {
          const prevSchGenItem = { ...item, available: true };
          scheduleGen[index] = prevSchGenItem;
        }
      }
      if (item.docDateTime === this.state.docDateTime) {
        const newSchGenItem = { ...item, available: false };
        scheduleGen[index] = newSchGenItem;
      }
    });
    this.props.editAppt({ initialStage: 'specialities' });
    this.props.fetchScheduleGen(scheduleGen);
    return newAppt;
  }

  componentDidMount() {
    /** sorting array as per searchString, adding visible and selected, making map depending on type (specialities, doctors*/
    const dataToMap = (array, type) => {
      for (let i = 0; i < array.length; i++) {
        if (type === 'specialities') {
          array[i].searchString = array[i].title.toLowerCase();
        } else if (type === 'doctors') {
          const fullName =
            array[i].surname +
            ' ' +
            array[i].firstName +
            ' ' +
            array[i].middleName;
          array[i].searchString = fullName.toLowerCase();
          array[i].fullName = fullName;
        } else if ((type = 'schedule')) {
          //search string is used for sorting
        }
        array[i].visible = true;
        array[i].selected = false;
      }

      const sorted = array.sort((a, b) => {
        if (a.searchString > b.searchString) return 1;
        if (a.searchString < b.searchString) return -1;
        if (a.searchString === b.searchString) return 0;
      });
      const newMap = new Map();
      sorted.forEach((elem) => {
        const { id, ...newElem } = elem;
        newMap.set(elem.id, newElem);
      });
      return newMap;
    };

    const specialities = dataToMap(dataSpecialities, 'specialities');
    const doctors = dataToMap(dataDoctors, 'doctors');
    //this.props.fetchScheduleGen(dataScheduleProc);
    let schedule;
    if (this.state.activeStage.type === 'schedule') {
      schedule = this.makeSchedule(this.state.doctorId);
    }
    const search = { ...this.state.search };
    search.disabled = false;
    this.setState((prevState) => {
      return {
        loading: false,
        search,
        specialities,
        doctors,
        schedule,
      };
    });
  }

  componentWillUnmount() {
    this.props.editAppt({ initialStage: 'specialities' });
  }

  render() {
    if (this.state.loading) {
      return <Spinner contentType='специальности' />;
    }
    let contents, stagePage, stageSwitch, search, btnBack, btnNext;
    btnNext = (
      <div className={this.props.classes.BtnForw}>
        <IconButton
          color='secondary'
          disabled={!this.state.activeStage.next}
          onClick={(e) =>
            this.stageChangeHandler(
              e,
              this.state.stages[this.state.activeStage.type].next
            )
          }
        >
          <ArrowForward />
        </IconButton>
      </div>
    );
    if (
      this.state.activeStage.type === 'specialities' ||
      this.state.activeStage.type === 'doctors'
    ) {
      stageSwitch = (
        <ApptSpecSwitch
          alt={this.state.activeStage.type}
          switchHandler={this.stageChangeHandler}
        />
      );
      search = (
        <div className={this.props.classes.Search}>
          <Search
            id='search_in_apptEditor'
            value={this.state.search.value}
            placeholder='Буквы русского алфавита, пробел'
            disabled={this.state.search.disabled}
            helperText={
              this.state.search.empty ? null : 'Буквы русского алфавита, пробел'
            }
            label='Поиск...'
            changeSearchHandler={this.changeSearchHandler}
          />
        </div>
      );
    }
    if (this.state.activeStage.type === 'specialities') {
      contents = (
        <ApptSpecialities
          specialities={this.state.specialities}
          selectHandler={this.selectHandler}
        >
          {(buttonVisible) => {
            if (!buttonVisible) return null;
            return (
              <ButtonMUI
                color='secondary'
                size='small'
                onClick={(e) =>
                  this.stageChangeHandler(
                    e,
                    this.state.stages[this.state.activeStage.type].next
                  )
                }
              >
                Далее
              </ButtonMUI>
            );
          }}
        </ApptSpecialities>
      );
    } else if (this.state.activeStage.type === 'doctors') {
      contents = (
        <ApptDoctors
          doctors={this.state.doctors}
          specialities={this.state.specialities}
          selectHandler={this.selectHandler}
        >
          {(buttonVisible) => {
            if (!buttonVisible) return null;
            return (
              <ButtonMUI
                color='secondary'
                size='small'
                onClick={(e) =>
                  this.stageChangeHandler(
                    e,
                    this.state.stages[this.state.activeStage.type].next
                  )
                }
              >
                Далее
              </ButtonMUI>
            );
          }}
        </ApptDoctors>
      );
    }
    if (
      this.state.activeStage.type === 'schedule' ||
      this.state.activeStage.type === 'confirm'
    ) {
      btnBack = (
        <div className={this.props.classes.BtnBack}>
          <IconButton
            color='secondary'
            disabled={!this.state.activeStage.prev}
            onClick={(e) =>
              this.stageChangeHandler(
                e,
                this.state.stages[this.state.activeStage.type].prev
              )
            }
          >
            <ArrowBack />
          </IconButton>
        </div>
      );
    }
    if (this.state.activeStage.type === 'schedule') {
      if (!this.state.schedule) contents = null;
      else {
        contents = (
          <ApptSchedule
            docDateTime={this.state.docDateTime}
            btnDisabled={!this.state.activeStage.next}
            btnName='Подтвердить запись'
            stageChangeHandler={(e) =>
              this.stageChangeHandler(
                e,
                this.state.stages[this.state.activeStage.type].next
              )
            }
            doctorId={this.state.doctorId}
            doctors={this.state.doctors}
            schedule={this.state.schedule}
            specialities={this.state.specialities}
            selectHandler={this.selectHandler}
          />
        );
      }
    }

    if (
      this.state.activeStage.type === 'confirm' ||
      this.state.activeStage.type === 'confirmed'
    ) {
      contents = (
        <ApptConfirm
          activeStage={this.state.activeStage}
          doctorId={this.state.doctorId}
          docDateTime={this.state.docDateTime}
          doctors={this.state.doctors}
          schedule={this.state.schedule}
          specialities={this.state.specialities}
          apptId={this.state.prevApptId}
          newAppt={this.state.newAppt}
        >
          {(btnName) => {
            return (
              <ButtonMUI
                disableRipple
                color='secondary'
                size='medium'
                disabled={!this.state.activeStage.next}
                onClick={(e) =>
                  this.stageChangeHandler(
                    e,
                    this.state.stages[this.state.activeStage.type].next
                  )
                }
              >
                {btnName}
              </ButtonMUI>
            );
          }}
        </ApptConfirm>
      );
    }

    stagePage = (
      <Fragment>
        <div className={this.props.classes.MB1}>
          {stageSwitch}
          {search}
        </div>
        {contents}
      </Fragment>
    );

    return (
      <Fragment>
        <div className={this.props.classes.MB1}>
          <ApptProgress
            stageChangeHandler={this.stageChangeHandler}
            activeStage={this.state.activeStage}
          />
        </div>

        {stagePage}
        <div className={this.props.classes.MB2}>
          {btnBack}
          {btnNext}
        </div>
      </Fragment>
    );
  }
}

ApptEditor.propTypes = {
  activeStage: PropTypes.string.isRequired,
  prevApptId: PropTypes.string,
  doctorId: PropTypes.string,
  specialityId: PropTypes.string,
  docDateTime: PropTypes.string,
  scheduleGen: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => {
  return {
    scheduleGen: state.scheduleGen,
    activeStage: state.apptEdited.initialStage,
    prevApptId: state.apptEdited.apptId,
    doctorId: state.apptEdited.doctorId,
    specialityId: state.apptEdited.specialityId,
    dateTimeSlot: state.apptEdited.dateTimeSlot,
    appts: state.appts,
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
)(withStyles(styleSheet)(ApptEditor));
