import { useEffect, useState } from "react";
import axiosClient from '../axios-client';
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const User = () => {
  const {setNotification} = useStateContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    axiosClient.get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  const onDelete = (user) => {
    if(!window.confirm("Are you sure You want to delete this data"))
    {
      return;
    }

    axiosClient.delete(`/users/${user.id}`)
    .then(() => {
      // TODO show notification
      setNotification("User has been deleted successfully!");
      getUsers();
    })
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Users</h1>
        <Link to="/user/new" className="btn-add">Add New</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          {loading && <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
          </tbody>}
          {!loading && <tbody>
            {users.map((user) => (
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.created_at}</td>
                <td>
                  <Link to={'/user/'+user.id} className="btn-edit">Edit</Link>
                  <button className="btn-delete" onClick={ev => onDelete(user)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>}
        </table>
      </div>
    </div>
  )
}

export default User;
