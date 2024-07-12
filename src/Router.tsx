import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Auth from './components/auth/Auth';
import MainPage from './components/main/MainPage';
import Homepage from './components/main/Homepage';

const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: '/auth',
                    element: <Auth />,
                },
                {
                    path:'/home',
                    element: <MainPage />,
                    children: [
                        {
                        index:true,
                        element: <Homepage />
                        }
                    ]
                }
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router;
