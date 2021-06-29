import { all, put, takeLatest } from 'redux-saga/effects'
import * as types from '../types'

export function* fetchUsers() {
  try {
    const response = yield fetch('/api/user')

    const userList = yield response.json()

    yield put({
      type: types.USER_FETCH_SUCCEEDED,
      payload: userList.data,
    })
  } catch (error) {
    yield put({
      type: types.USER_FETCH_FAILED,
      payload: error.message,
    })
  }
}

export function* watchFetchUser() {
  yield takeLatest(types.USER_FETCH_REQUESTED, fetchUsers)
}

export function* addUser(action) {
  try {
    const response = yield fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    })

    const newUser = yield response.json()

    yield put({
      type: types.USER_ADD_SUCCEEDED,
      payload: newUser.data,
    })
  } catch (error) {
    yield put({
      type: types.USER_ADD_FAILED,
      payload: error.message,
    })
  }
}

export function* watchAddUser() {
  yield takeLatest(types.USER_ADD_REQUESTED, addUser)
}

export function* deleteUser(action) {
  try {
    const response = yield fetch('/api/user/' + action.payload, {
      method: 'DELETE',
    })

    const deletedUser = yield response.json()

    yield put({
      type: types.USER_DELETE_SUCCEEDED,
      payload: deletedUser.data.id,
    })
  } catch (error) {
    yield put({
      type: types.USER_DELETE_FAILED,
      payload: error.message,
    })
  }
}

export function* watchRemoveUser() {
  yield takeLatest(types.USER_DELETE_REQUESTED, deleteUser)
}

export function* updateUser(action) {
  try {
    const response = yield fetch('/api/user/' + action.payload._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    })

    const updatedUser = yield response.json()

    yield put({
      type: types.USER_UPDATE_SUCCEEDED,
      payload: updatedUser.data,
    })
  } catch (error) {
    yield put({
      type: types.USER_UPDATE_FAILED,
      payload: error.message,
    })
  }
}

export function* watchUpdateUser() {
  yield takeLatest(types.USER_UPDATE_REQUESTED, updateUser)
}
