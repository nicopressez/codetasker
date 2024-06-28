import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

export default function Auth() { 

 const [loginPage, setLoginPage] = useState(false)

 if (loginPage) return (
  <Login setLoginPage={setLoginPage}/>
 )
 return (
  <Signup setLoginPage={setLoginPage}/>
 )
}