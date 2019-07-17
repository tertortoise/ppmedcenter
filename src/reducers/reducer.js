import image from '../images/img.jpg';
import {
  FETCH_SCHEDULEGEN,
  FETCH_APPTS,
  EDIT_APPT,
  FETCH_PERSONALIMAGE,
  FETCH_PERSONALPWR,
  FETCH_PERSONALDATA,
} from '../actions/actionTypes';

const initialState = {
  scheduleGen: undefined,
  appts: undefined,
  apptEdited: {
    doctorId: undefined,
    appttId: undefined,
    docDateTime: undefined,
    initialStage: 'specialities',
  },
  personalData: {
    surname: 'Иванова',
    firstName: 'Мария',
    middleName: 'Ивановна',
    phone: '+7 (999) 123 45 67',
    email: 'test@test.ru',
    login: 'ivanova79',
  },
  personalImage: image,
  personalPwr: 'test123456',
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SCHEDULEGEN:
      return {
        ...state,
        scheduleGen: action.payload,
      };
    case FETCH_APPTS:
      return {
        ...state,
        appts: action.payload,
      };
    case EDIT_APPT:
      return {
        ...state,
        apptEdited: action.payload,
      };
    case FETCH_PERSONALDATA:
      return {
        ...state,
        personalData: action.payload,
      };
      case FETCH_PERSONALIMAGE:
      return {
        ...state,
        personalImage: action.payload,
      };
      case FETCH_PERSONALPWR:
      return {
        ...state,
        personalPwr: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
