/* eslint-disable import/no-anonymous-default-export */
const init_state = {
  userData: {},
  storageIsChecked: false,
};

export default (state = init_state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, userData: action.payload, storageIsChecked: true };
    case "CHECK_STORAGE":
      return { ...state, storageIsChecked: true };
    default:
      return state;
  }
};
