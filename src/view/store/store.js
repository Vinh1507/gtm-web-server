import {configureStore as configureStoreRedux} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import Reducer from './../reducers/RootReducer.js';

export default function configureStore() {
  return configureStoreRedux(
    {
      reducer: Reducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    },
  );
}
