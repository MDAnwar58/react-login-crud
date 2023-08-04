import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

const DefaultLayout = () => {

    const { user, token, notification, setUser, setToken } = useStateContext();
    
    
    useEffect(() => {
        axiosClient.get("/user")
        .then(({data}) => {
            setUser(data);
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout")
        .then(() => {
            setUser({});
            setToken(null);
        })
    }

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/user">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>

            {notification && <div className="notification">
                {notification}   
            </div>}
        </div>
    )
}

export default DefaultLayout
