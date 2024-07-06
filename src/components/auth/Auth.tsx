import { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import logo from '../../assets/logo.svg';

export default function Auth() {
    const [loginPage, setLoginPage] = useState(false);

    return (
        <div className=" bg-indigo-300 w-full h-full fixed">
            <div className="fixed top-44 left-20">
                <h1
                    className="bg-white w-52 font-rubikMed text-5xl text-center text-gray-800
          pt-2 pb-2 rounded-md"
                >
                    <img
                        className="inline h-8 mb-2 mr-1"
                        src={logo}
                        alt="Logo"
                    ></img>
                    Tasker
                </h1>
                <div className="font-rubikMed text-3xl mt-4">
                    <p>
                        Optimize your work <br />
                        delivery to multiple teams <br />
                        and handle even the most <br />
                        complex projects in a <br />
                        single environment.
                    </p>
                </div>
                <div className="font-rubik mt-3 text-lg">
                    <p>
                        Achieve continuous improvement and sustainable <br />
                        change within an organization implementing <br />
                        changes based on scientifically proven methods, <br />
                        feedback, and metrics. Tasker is here to help.
                    </p>
                </div>
            </div>
            <div className=" pl-[37%] h-full">
                {loginPage ? (
                    <Login setLoginPage={setLoginPage} />
                ) : (
                    <Signup setLoginPage={setLoginPage} />
                )}
            </div>
        </div>
    );
}
