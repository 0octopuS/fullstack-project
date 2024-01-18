import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../services/users";

const User = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    const fetchedUser = await getUser(userId);
    setUser(fetchedUser);
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3> added blogs </h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}> {blog.title} </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
