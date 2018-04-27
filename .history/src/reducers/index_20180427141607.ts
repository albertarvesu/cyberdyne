import { combineReducers } from 'redux';

import { robots } from './robots';

export const rootReducer = combineReducers({
  robots,
});

export default rootReducer;