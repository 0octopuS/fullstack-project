// 7.17 Implement a navigation menu for the application:

import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ user, logout }) => {
  const padding = {
    padding: 5,
  };

  return (
    <nav>
      <Link style={padding} to="/users">
        Users
      </Link>
      <Link style={padding} to="/blogs">
        Blogs
      </Link>
      {user ? (
        <span>
          <em>{user.name} logged in</em>{" "}
          <button onClick={logout}>logout</button>{" "}
        </span>
      ) : (
        <Link style={padding} to="/login">
          login
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
