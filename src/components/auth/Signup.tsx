import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {

 const auth = getAuth()

 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")
 const [repeatPassword, setRepeatPassword] = useState("")

 // Edit state values on input change
 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target
  if (name === "email") setEmail(value)
  if (name === "password") setPassword(value)
  if (name === "repeatPassword") setRepeatPassword(value)

  return;
 }

 // Send signup request on submit
 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  if(password === repeatPassword) {
  createUserWithEmailAndPassword(auth, email, password)
       .then((userCredential => {
              //Signed up
              //TODO: Login to user
              const user = userCredential.user;
              console.log(`New user created: ${email}`);
       }))
       .catch((error) => {
              console.log(error)
       })

  } else {
       //TODO : Add error message
       console.log("Passwords don't match")
  }
 }
 return (
  <>
  

    <div className="w-100 text-center mt-2">
     <h1 className=" font-bold">
      Signup
      </h1>
      <form onSubmit={handleSubmit}>
       <input id="email" 
              type="email"
              name="email"
              placeholder="Email address"
              value={email}
              onChange={handleChange}
              ></input>
       <input id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              ></input>
       <input id="repeatPassword"
              type="password"
              name="repeatPassword"
              placeholder="Repeat password"
              value={repeatPassword}
              onChange={handleChange}
              ></input>
              <input type="submit"
                     value="Submit"></input>
      </form>
     Already have an account? Log in
    </div>
  </>
 )
}