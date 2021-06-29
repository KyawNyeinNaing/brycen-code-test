import * as types from '@/src/store/types'

export const fetchUsers = () => {
  return {
    type: types.USER_FETCH_REQUESTED,
  }
}

export const addUser = (user) => {
  return {
    type: types.USER_ADD_REQUESTED,
    payload: user,
  }
}

export const updateUser = (user) => {
  return {
    type: types.USER_UPDATE_REQUESTED,
    payload: user,
  }
}

export const deleteUser = (id) => {
  return {
    type: types.USER_DELETE_REQUESTED,
    payload: id,
  }
}
