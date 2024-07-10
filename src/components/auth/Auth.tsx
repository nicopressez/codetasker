import { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import logo from '../../assets/logo.svg';

export default function Auth() {
    const [loginPage, setLoginPage] = useState(false);

    return (
        <div className=" p-3 md:p-0 bg-indigo-300 w-screen h-full md:fixed">
            <div className="md:fixed p-2 md:p-0 md:top-44 md:left-20">
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
            <div className=" md:pl-[37%] md:h-full">
                {loginPage ? (
                    <Login setLoginPage={setLoginPage} />
                ) : (
                    <Signup setLoginPage={setLoginPage} />
                )}
            </div>
        </div>
    );
}
