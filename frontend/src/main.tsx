import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from 'react-router-dom';
import { LoginForm } from './components/LoginForm/LoginForm.tsx';
import { RegisterForm } from './components/RegisterForm/RegisterForm.tsx';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginForm />,
    },
    {
        path: '/register',
        element: <RegisterForm />,
    },
    {
        path: '*',
        element: (
            <Navigate
                to='/login'
                replace
            />
        ),
    },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
