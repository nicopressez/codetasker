import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

type SignupProps = {
  setLoginPage: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Signup( { setLoginPage } : 
       SignupProps
) {

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
              const user = userCredential.user;
              console.log(`New user created: ${email}`);
       }))
       .catch((error) => {
              // TODO: Add error
              console.log(error)
       })

  } else {
       //TODO : Add error message
       console.log("Passwords don't match")
  }
 }
 return (
  <>
  

    <div className=" pt-20 pb-20 pl-48 pr-48 h-full  bg-white font-rubik rounded-2xl">
     <h1 className=" font-bold text-3xl mb-10">
      Create Account
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col 
       '>
       <label htmlFor='email'
              className='text-gray-400'>
                     Email address
                     </label>
       <input id="email" 
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className=' border-gray-200 border-2 rounded-lg mb-5 p-2'
              ></input>
              
       <label htmlFor='password'
              className='text-gray-400'>
              Password
              </label>
       <input id="password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className=' border-gray-200 border-2 rounded-lg mb-5 p-2'
              ></input>
       <label htmlFor='repeatPassword'
              className='text-gray-400'>
              Repeat Password
              </label>
       <input id="repeatPassword"
              type="password"
              name="repeatPassword"
              value={repeatPassword}
              onChange={handleChange}
              className=' border-gray-200 border-2 rounded-lg mb-5 p-2'
              ></input>
              <input type="submit"
                     value="Create Account"
                     className='p-2 bg-cyan-400 rounded-2xl text-white
                      font-semibold hover:cursor-pointer'></input>
      </form>
     Already have an account? 
     <button onClick={() => setLoginPage(true)}>
       Log in
       </button>
    </div>
  </>
 )
}