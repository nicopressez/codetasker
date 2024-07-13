import { useNavigate, Outlet } from 'react-router-dom';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
    const navigate = useNavigate()
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (location.pathname === "/auth") navigate("/home")
            const uid = user.uid;
        } else {
            navigate("/auth")
        }
    });

    return <Outlet />;
}

export default App;
