// 7.14 Implement a view to the application that displays all of the basic information related to users
import { getUsers } from "../services/users";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Users = ({ blogs }) => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const fetchedUsers = await getUsers();
    setUsers(fetchedUsers);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // create a map here, to get pairs of [user, number of blogs user created]
  // each blog in Blogs has an attribute user":{"username":"","name":"","id":"6599365826d04e7d091bb6cd"}
  // each user in Users has id:...
  const blogsByUser = blogs.reduce((acc, blog) => {
    const userId = blog.user.id;
    acc[userId] = (acc[userId] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h2> Users </h2>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Name</th>
            <th style={{ textAlign: "left" }}>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td style={{ textAlign: "center" }}>
                {blogs.filter((blog) => blog.user.id === user.id).length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
