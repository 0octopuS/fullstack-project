// 7.11 Store the information about blog posts in the Redux store.
// 7.12 Expand your solution so that it is again possible to like and delete a blog.
//     my previous solution require `getAll` function from backend, so frontend and backend's data stay the same. it only needs SET_BLOGS dispatch.

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_BLOG":
      state.concat({
        author: action.payload.author,
        title: action.payload.title,
        url: action.payload.url,
      });
      return state;
    case "SET_BLOGS":
      state = action.payload;
      return state;
    // case "DELETE_BLOGS":

    default:
      return state;
  }
};

export const addBlog = (message) => ({
  type: "ADD_BLOG",
  payload: {
    author: message.author,
    title: message.title,
    url: message.url,
  },
});
export const setBlogs = (message) => ({
  type: "SET_BLOGS",
  payload: message,
});
export default blogReducer;
