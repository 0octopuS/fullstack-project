// 6.23 Implement the application's notification state management using the useReducer hook and context

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

export const setNotification = (message) => ({
  type: "SET_NOTIFICATION",
  payload: message,
});

export const clearNotification = () => ({
  type: "CLEAR_NOTIFICATION",
});

export default notificationReducer;
