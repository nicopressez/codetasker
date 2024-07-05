import { signInWithEmailAndPassword, getAuth} from 'firebase/auth'
import React, { useState } from 'react'

type LoginProps = {
  setLoginPage: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Login( { setLoginPage } : 
  LoginProps
) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false)


  const auth = getAuth();

  // Edit state values on input change
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    if (name === "email") setEmail(value)
    if (name === "password") setPassword(value)
  }

  // Send login request on submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setTimeout(() => {
          setIsLoading(false)
        }, 200);
        const user = userCredentials
        // TODO: Store user data
        console.log(user)
      })
      .catch((err) => {
        //TODO : Add error handling
        console.log(err)
        setTimeout(() => {
          setIsLoading(false)
        }, 500);
      })
  }
  return (
    <div className=" pt-24 pb-20 pl-52 pr-48 h-full  bg-white font-rubik rounded-l-[2.5rem]">
     <h1 className=" font-bold text-3xl mb-10 tracking-wide">
      Log in
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
              className= {`border-gray-200 border-2 rounded-lg mb-5 p-2
                ${isLoading && "brightness-95"}`}
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
              className= {`border-gray-200 border-2 rounded-lg mb-5 p-2
                ${isLoading && "brightness-95"}`}
              ></input>
       
              <input type="submit"
                     value="Log in"
                     className={`p-2 bg-indigo-400 rounded-2xl text-white
                      font-semibold hover:cursor-pointer
                      ${isLoading && "brightness-90"}`}></input>
      </form>
      <p className='mt-5 text-gray-400'>
     Don't have an account yet?
     <button onClick={() => setLoginPage(false)}
       className='text-indigo-400 ml-1'>
        Sign up
       </button>
       </p>
    </div>
  )
}
