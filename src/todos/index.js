import { NAME, actionTypes } from './constants';
import * as actions from './actions';
import reducer from './reducer';
import { sagas, actionTypes as at, actions as a } from './sagas';

// re-select
// import * as selectors from './selectors'

import MainSection from './components/MainSection';

const allActionTypes = Object.assign({},
                                     actionTypes,
                                     at
                                    );

const allActions = Object.assign({},
                                 actions,
                                 a
                                );

export default {
  NAME,
  allActionTypes,
  allActions,
  reducer,
  sagas,
  MainSection,
};
