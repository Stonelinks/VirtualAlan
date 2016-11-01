
import { combineReducers } from 'redux';

import drawer from './drawer';
import route from './route';
import list from './list';

export default combineReducers({

  drawer,
  route,
  list,

});
