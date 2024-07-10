import {
    signInWithEmailAndPassword,
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
import React, { useState } from 'react';
import googleLogo from '../../assets/google.png';

type LoginProps = {
    setLoginPage: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Login({ setLoginPage }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    // Edit state values on input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    // Google authentication
    const handleGoogleAuth = () => {
        // TODO: For phone users, login with redirect
        signInWithPopup(auth, provider)
            .then((result) => {
                // Logged in
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
            })
            .catch(() => {
                setError(true);
            });
    };
    // Send login request on submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false);
        setIsLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 200);
                const user = userCredentials;
                // TODO: Store user data
                console.log(user);
            })
            .catch((err) => {
                setError(true);
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            });
    };
    return (
        <div className=" pt-24 pb-20 pl-52 pr-48 h-full  bg-white font-rubik rounded-l-[2.5rem]">
            <h1 className=" font-bold text-3xl mb-7 tracking-wide">Log in</h1>
            {error && (
                <p className="text-red-500 mb-1 -mt-2">
                    Wrong credentials. Please try again.
                </p>
            )}
            <div className="flex justify-center">
                <button
                    className="text-center w-full border-2 border-gray-200 rounded-lg
                p-2 hover:brightness-95 "
                    onClick={handleGoogleAuth}
                >
                    <img src={googleLogo} alt="Logo" className="inline mr-2" />
                    Continue with Google
                </button>
            </div>
            <p className="text-center text-gray-400 text-lg mt-2 mb-2">
                - OR -
            </p>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col 
       "
            >
                <label htmlFor="email" className="text-gray-400">
                    Email address
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className={`border-gray-200 border-2 rounded-lg mb-5 p-2
                ${isLoading && 'brightness-95'}`}
                ></input>

                <label htmlFor="password" className="text-gray-400">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    className={`border-gray-200 border-2 rounded-lg mb-5 p-2
                ${isLoading && 'brightness-95'}`}
                ></input>

                <input
                    type="submit"
                    value="Log in"
                    className={`p-2 bg-indigo-400 rounded-2xl text-white
                      font-semibold hover:cursor-pointer hover:brightness-105
                      active:brightness-110
                      ${isLoading && 'brightness-90'}`}
                ></input>
            </form>
            <p className="mt-5 text-gray-400">
                Don't have an account yet?
                <button
                    onClick={() => setLoginPage(false)}
                    className="text-indigo-400 ml-1 hover:brightness-90
                  hover:underline"
                >
                    Sign up
                </button>
            </p>
        </div>
    );
}
