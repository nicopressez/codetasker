import { Outlet } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext.jsx"
import { config } from 'dotenv';
config();

function App() {

  return (
    <AuthProvider>
     <Outlet />
    </AuthProvider>
  )
}

export default App
