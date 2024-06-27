import { Outlet } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext.jsx"

function App() {

  return (
    <AuthProvider>
     <Outlet />
     </AuthProvider>
  )
}

export default App
