import * as actions from './actionTypes';

const fetchScheduleGen = (scheduleGen) => {
  return {
    type: actions.FETCH_SCHEDULEGEN,
    payload: scheduleGen,
  }
}

const fetchAppts = (appts) => {
  return {
    type: actions.FETCH_APPTS,
    payload: appts,
  }
}

const editAppt = (apptEdited) => {
  return {
    type: actions.EDIT_APPT,
    payload: apptEdited,
  }
}

const fetchPersonalData = (personalData) => {
  return {
    type: actions.FETCH_PERSONALDATA,
    payload: personalData,
  }
}

const fetchPersonalImage = (personalImage) => {
  return {
    type: actions.FETCH_PERSONALIMAGE,
    payload: personalImage,
  }
}

const fetchPersonalPwr = (personalPwr) => {
  return {
    type: actions.FETCH_PERSONALPWR,
    payload: personalPwr,
  }
}

export {
  fetchScheduleGen,
  fetchAppts,
  editAppt,
  fetchPersonalData,
  fetchPersonalImage,
  fetchPersonalPwr,
}