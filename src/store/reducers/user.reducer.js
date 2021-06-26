import * as types from '../types'

const initialState = {
  userList: []
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_FETCH_SUCCEEDED:
      return {
        ...state,
        userList: action.payload,
      }

    case types.USER_ADD_SUCCEEDED:
      return {
        ...state,
        userList: [
          action.payload,
          ...state.userList
        ],
      }

    case types.USER_UPDATE_SUCCEEDED:
      const updatedUser = state.userList.map((user) => {
        if (user._id === action.payload._id) {
          return {
            ...user,
            name: action.payload.name,
            role: action.payload.role
          };
        }
        return user;
      })

      return { ...state, userList: updatedUser }

    case types.USER_DELETE_SUCCEEDED:
      const newUserList = state.userList.filter(
        (user) => user._id !== action.payload
      );
      return {
        ...state,
        userList: newUserList,
      };

    default:
      return state
  }
}

export default user