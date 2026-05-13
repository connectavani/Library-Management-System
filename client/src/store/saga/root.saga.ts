import { all, fork } from 'redux-saga/effects';
import authenticateUserSaga from './auth.saga';
import userSaga from './user.saga';
import roleSaga from './role.saga';
import bookSaga from './book.saga';

function* rootSaga() {
  yield all([
    fork(authenticateUserSaga),
    fork(userSaga),
    fork(roleSaga),
    fork(bookSaga),
  ]);
}

export default rootSaga;
