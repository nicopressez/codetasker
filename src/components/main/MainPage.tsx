import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function MainPage() {
    return (
        <div className="w-screen h-screen">
            <Sidebar />
            <Navbar />
            <Outlet />
        </div>
    );
}
