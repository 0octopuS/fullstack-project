import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  setNotification,
  setError,
  clearNotification,
} from "./reducers/notificationReducer";
import { setBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";

import BlogList from "./components/BlogList";
import blogService from "./services/blogs";
import loginService from "./services/login";
import storageService from "./services/storage";

import LoginForm from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import User from "./components/User";
import Users from "./components/Users";
import BlogDetails from "./components/BlogDetail";
import Navigation from "./components/Navigation";


// 7.9 automatic code formatting for both frontend and backend
const App = () => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  // const [blogs, setBlogs] = useState([])
  // const [user, setUser] = useState('')
  // const [info, setInfo] = useState({ message: null })

  const blogFormRef = useRef();

  useEffect(() => {
    const user = storageService.loadUser();
    dispatch(setUser(user));
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }, []);

  const notifyWith = (message, type = "info") => {
    if (type === "info") {
      dispatch(setNotification(message));
    } else {
      dispatch(setError(message));
    }
    setTimeout(() => {
      // setInfo({ message: null } )
      dispatch(clearNotification());
    }, 3000);
  };

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      dispatch(setUser(user));
      storageService.saveUser(user);
      notifyWith("welcome!");
    } catch (e) {
      notifyWith("wrong username or password", "error");
    }
  };

  const logout = async () => {
    dispatch(setUser(null));
    storageService.removeUser();
    notifyWith("logged out");
  };

  const createBlog = async (newBlog) => {
    const createdBlog = await blogService.create(newBlog);
    notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`);
    dispatch(setBlogs(blogs.concat(createdBlog)));
    blogFormRef.current.toggleVisibility();
  };

  const like = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    const updatedBlog = await blogService.update(blogToUpdate);
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`);
    dispatch(setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b))));
  };

  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`,
    );
    if (ok) {
      await blogService.remove(blog.id);
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`);
      dispatch(setBlogs(blogs.filter((b) => b.id !== blog.id)));
    }
  };

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification info={info} />
        <LoginForm login={login} />
      </div>
    );
  }

  return (
    <Router>
      <div>
        <h1>Blogs Website </h1>
        <Navigation user={user} logout={logout} />
        <Notification info={info} />
        <Togglable buttonLabel="new note" ref={blogFormRef}>
          <NewBlog createBlog={createBlog} />
        </Togglable>
        <div>
          <Routes>
            <Route path="/users" exact element={<Users blogs={blogs} />} />
            <Route
              path="/blogs"
              element={
                <BlogList
                  user={user}
                  blogs={blogs}
                  like={like}
                  remove={remove}
                />
              }
            />
            <Route path="/users/:userId" element={<User />} />
            <Route path="/blogs/:blogId" element={<BlogDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
