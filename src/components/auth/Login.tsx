import React from 'react'

type LoginProps = {
  setLoginPage: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Login( { setLoginPage } : 
  LoginProps
) {
  return (
    <div>
    <h1 className=" font-bold">
      Login
      </h1>
     <p>Don't have an account yet? 
      <button onClick={() => setLoginPage(false)}>
        Signup
        </button>
     </p>
    </div>
  )
}
