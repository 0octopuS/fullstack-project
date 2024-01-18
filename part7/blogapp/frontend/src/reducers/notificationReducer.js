// 7.10 Refactor the application to use Redux to manage the notification data.

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { message: action.payload, type: "notification" };

    case "SET_WARNING":
      return { message: action.payload, type: "error" };

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

export const setError = (message) => ({
  type: "SET_ERROR",

  payload: message,
});

export const clearNotification = () => ({
  type: "CLEAR_NOTIFICATION",
});

// const store = createStore(notificationReducer)

export default notificationReducer;
