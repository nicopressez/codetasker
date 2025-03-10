import { useState } from 'react';
import {
    getAuth,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import googleLogo from '../../assets/google.png';

type SignupProps = {
    setLoginPage: React.Dispatch<React.SetStateAction<boolean>>;
    handleGoogleAuth: (page: string) => void;
    googleError: boolean;
};

export default function Signup({ setLoginPage, handleGoogleAuth, googleError }: SignupProps) {
    const auth = getAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [errors, setErrors] = useState({
        email: false,
        password: false,
        passwordMatch: false,
        emailUsed: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    // Edit state values on input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
        if (name === 'repeatPassword') setRepeatPassword(value);

        return;
    };

    //Validate form inputs
    const validateForm = () => {
        const newErrors = {
            email: email.length < 8,
            password: password.length < 8,
            passwordMatch: password !== repeatPassword,
            emailUsed: false,
        };
        return newErrors;
    };

    // Send signup request on submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Check errors in form
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.values(validationErrors).some((error) => error)) {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
            return;
        }

        // No errors, create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                //Signed up
                setTimeout(() => {
                    setIsLoading(false);
                }, 200);
            })
            .catch(() => {
                setErrors((prevErrors) => ({ ...prevErrors, emailUsed: true }));
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            });
    };
    return (
        <>
            <div className="p-5 md:pt-24 md:pb-20 md:pl-44 md:pr-48 md:h-full  bg-white font-rubik rounded-[1.5rem] md:rounded-r-none md:rounded-l-[2.5rem]">
                <h1 className=" font-bold text-2xl md:text-3xl mb-7 tracking-wide text-center md:text-left">
                    Create Account
                </h1>
                <div className="flex justify-center">
                    <button
                        className="text-center w-full border-2 border-gray-200 rounded-lg
                p-2 hover:brightness-95 "
                        onClick={() => handleGoogleAuth("signup")}
                    >
                        <img
                            src={googleLogo}
                            alt="Logo"
                            className="inline mr-2"
                        />
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
                        {errors.email && (
                            <p className=" text-red-500 float-right">
                                Must be at least 8 characters long
                            </p>
                        )}
                        {errors.emailUsed && (
                            <p className=" text-red-500 float-right">
                                Already in use
                            </p>
                        )}
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
                        {errors.password && (
                            <p className=" text-red-500 float-right">
                                Must be at least 8 characters long
                            </p>
                        )}
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
                    <label htmlFor="repeatPassword" className="text-gray-400">
                        Repeat Password
                        {errors.passwordMatch && (
                            <p className=" text-red-500 float-right">
                                Passwords don't match
                            </p>
                        )}
                    </label>
                    <input
                        id="repeatPassword"
                        type="password"
                        name="repeatPassword"
                        value={repeatPassword}
                        onChange={handleChange}
                        className={`border-gray-200 border-2 rounded-lg mb-5 p-2
                     ${isLoading && 'brightness-95'}`}
                    ></input>
                    <input
                        type="submit"
                        value="Create Account"
                        className={`p-2 bg-indigo-400 rounded-2xl text-white
                      font-semibold hover:cursor-pointer hover:brightness-105
                      active:brightness-110
                      ${isLoading && 'brightness-90'}`}
                    ></input>
                </form>
                <p className="mt-5 text-gray-400">
                    Already have an account?
                    <button
                        onClick={() => setLoginPage(true)}
                        className={`text-indigo-400 ml-1 hover:brightness-90
                  hover:underline
       ${isLoading && 'brightness-95'}`}
                        name='Loginbutton'
                    >
                        Log in
                    </button>
                </p>
            </div>
        </>
    );
}
