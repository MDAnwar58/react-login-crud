import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const UserAddForm = () => {
    const {setNotification} = useStateContext();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data);
                })
                .catch(() => {
                    setLoading(false);
                })
        }, []);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    // show notification
                    setNotification("User was successfully updated!");
                    navigate("/user");
                })
                .catch((err) => {
                    // debugger;
                    const response = err.response;
                    if (response && response.status === 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient.post(`/users`, user)
                .then(() => {
                    setNotification("User created successfully!");
                    navigate("/user");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    }
                });
        }
    }

    return (
        <>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">Loading...</div>
                )}
                {errors && <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>}

                {!loading &&
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Name" onChange={ev => setUser({ ...user, name: ev.target.value })} value={user.name} />
                        <input type="email" placeholder="email" onChange={ev => setUser({ ...user, email: ev.target.value })} value={user.email} />
                        <input type="password" placeholder="password" onChange={ev => setUser({ ...user, password: ev.target.value })} />
                        <input type="password" placeholder="password confirmation" onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })} />
                        <button className="btn" type="submit">Save</button>
                    </form>
                }
            </div>
        </>
    )
}

export default UserAddForm;
