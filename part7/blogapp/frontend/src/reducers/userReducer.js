// 7.13 Store the information about the signed-in user in the Redux store
const userReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_USER":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export const setUser = (message) => ({
  type: "SET_USER",
  payload: message,
});
export default userReducer;
