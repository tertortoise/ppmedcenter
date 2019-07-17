import { createStore, compose, applyMiddleware} from 'redux';

import reducer from './reducers/reducer';

const logMiddleware = ({getState, dispatch}) => (next) => (action) => {
  return next(action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(
    logMiddleware
  ))
  
);

export default store;
