import { useEffect, useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import logo from '../../assets/logo.svg';
import { signInWithRedirect,
    signInWithPopup,
    getAuth,
    GoogleAuthProvider,
    getRedirectResult, } from 'firebase/auth';

export default function Auth() {
    const [width, setWidth] = useState(window.innerWidth)
    const [loginPage, setLoginPage] = useState(false);
    const [googleLoginError, setGoogleLoginError] = useState(false);
    const [googleSignupError, setGoogleSignupError] = useState(false);

    const auth = getAuth()
    const provider = new GoogleAuthProvider();

    getRedirectResult(auth)
        .catch(() => {
            if(loginPage) setGoogleLoginError(true);
            else setGoogleSignupError(true);
  });


    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth)
    }

    const isMobile = width <= 400;

    // Listen to page width to detect mobile device
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange)
        }
    }, [])

      // Google authentication
        const handleGoogleAuth = (page: string) => {
            if(isMobile) {
                //TODO: Test on live 
                signInWithRedirect(auth,provider)
            } else {
            signInWithPopup(auth, provider)
                .catch(() => {
                    if(page === "login") setGoogleLoginError(true)
                    if(page === "signup") setGoogleSignupError(true)
                });
            }
        };

    return (
        <div className=" p-3 md:p-0 bg-indigo-300 w-screen h-full md:fixed">
            <div className="md:fixed p-2 md:p-0 md:top-36 md:left-12">
                <h1
                    className="bg-white md:w-52 font-rubikMed text-3xl md:text-5xl text-center text-gray-800
          pt-2 pb-2 rounded-md"
                >
                    <img
                        className="inline md:h-8 mb-2 mr-1"
                        src={logo}
                        alt="Logo"
                    ></img>
                    Tasker
                </h1>
                <div className="mb-3 font-rubikMed text-2xl md:text-3xl mt-4">
                    <p>
                        Optimize your work <br />
                        delivery to multiple teams <br />
                        and handle even the most <br />
                        complex projects in a <br />
                        single environment.
                    </p>
                </div>
                <div className="font-rubik mt-2 hidden md:inline md:mt-3 md:text-lg">
                    <p>
                        Achieve continuous improvement and sustainable <br />
                        change within an organization implementing <br />
                        changes based on scientifically proven methods, <br />
                        feedback, and metrics. Tasker is here to help.
                    </p>
                </div>
            </div>
            <div className=" md:pl-[44%] md:h-full">
                {loginPage ? (
                    <Login 
                    setLoginPage={setLoginPage} 
                    handleGoogleAuth={handleGoogleAuth}
                    googleError={googleLoginError} />
                ) : (
                    <Signup 
                    setLoginPage={setLoginPage}
                    handleGoogleAuth={handleGoogleAuth}
                    googleError={googleSignupError} />
                )}
            </div>
        </div>
    );
}
