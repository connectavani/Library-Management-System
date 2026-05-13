import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import { LOGOUT_USER_REQUEST } from '../action/auth.action';
import UserReducer from './user.reducer';
import roleReducer from './role.reducer';
import bookReducer from './book.reducer';

const allReducers = combineReducers({
  auth: authReducer,
  user: UserReducer,
  role: roleReducer,
  book: bookReducer,
});

export const rootReducer = (state: any, action: any) => {
  if (action.type === LOGOUT_USER_REQUEST) {
    state = undefined;
  }
  return allReducers(state, action);
};

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
