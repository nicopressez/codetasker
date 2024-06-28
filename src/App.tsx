import { Outlet } from "react-router-dom"
import { auth } from "./config/firebase"
import { onAuthStateChanged } from "firebase/auth"


function App() {

  onAuthStateChanged(auth, (user) => {
    if (user) {  
      console.log(user)
      const uid = user.uid;
    } else {
      // TODO: Add redirect if user login in
      // User is signed out
    }
  });
  

  return (
     <Outlet />
  )
}

export default App
