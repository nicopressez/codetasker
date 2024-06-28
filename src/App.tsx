import { Outlet } from "react-router-dom"
import { auth } from "./config/firebase"
import { onAuthStateChanged } from "firebase/auth"


function App() {

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // TODO: Add redirect if user login in
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
    }
  });
  

  return (
     <Outlet />
  )
}

export default App
