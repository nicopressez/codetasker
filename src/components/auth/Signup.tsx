import { useAuth } from '../../contexts/AuthContext.jsx'
import { useState } from 'react'

export default function Signup() {

 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")
 const [repeatPassword, setRepeatPassword] = useState("")

 const { signup } = useAuth()

 // Edit state values on input change
 const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
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
   signup(email, password)
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