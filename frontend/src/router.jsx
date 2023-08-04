import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from './views/Login';
import Signup from './views/Signup';
import User from './views/User';
import NotFound from './views/NotFound';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import Dashboard from './views/Dashboard';
import UserAddForm from './views/UserAddForm';

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [ // this is auth check and user find then access /user route
            {
                path: "/",
                element: <Navigate to="/user" />
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/user",
                element: <User />
            },
            {
                path: "/user/new",
                element: <UserAddForm key="userCreate" />
            },
            {
                path: "/user/:id",
                element: <UserAddForm key="userUpdate" />
            },
        ]
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]);

export default router;