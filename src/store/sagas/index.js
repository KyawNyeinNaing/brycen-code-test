import { all } from '@redux-saga/core/effects'

import {
  watchFetchProducts,
  watchAddProduct,
  watchRemoveProduct,
  watchUpdateProduct
} from './product'

import {
  watchFetchUser,
  watchAddUser,
  watchRemoveUser,
  watchUpdateUser
} from './user'

export default function* rootSaga() {
  yield all([
    // employee
    watchFetchProducts(),
    watchAddProduct(),
    watchRemoveProduct(),
    watchUpdateProduct(),

    //user
    watchFetchUser(),
    watchAddUser(),
    watchRemoveUser(),
    watchUpdateUser()
  ])
}
