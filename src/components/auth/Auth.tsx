import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

export default function Auth() { 

 const [loginPage, setLoginPage] = useState(false)

 return (
  <div className=" bg-purple-300 w-full h-full fixed">
   <div className=" pl-[37%] h-full">
   <Signup setLoginPage={setLoginPage} />
   </div>
  </div>
 )
}