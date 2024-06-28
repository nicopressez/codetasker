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
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials
        // TODO: Store user data
        console.log(user)
      })
      .catch((err) => {
        //TODO : Add error handling
        console.log(err)
      })
  }
  return (
    <div className='w-100 text-center mt-2'>
    <h1 className=" font-bold">
      Login
      </h1>
      <form onSubmit={handleSubmit}>
      <input type="email"
             name="email"
             placeholder="Email address"
             value={email}
             onChange={handleChange}
      />
      <input type="password"
             name="password"
             placeholder="Password"
             value={password}
             onChange={handleChange}
      />
      <input type="submit"
             value="Submit"/>
      </form>
     <p>Don't have an account yet? 
      <button onClick={() => setLoginPage(false)}>
        Signup
        </button>
     </p>
    </div>
  )
}
