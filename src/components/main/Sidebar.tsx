import logo from '../../assets/logo.svg';
import boardIcon from '../../assets/boardIcon.svg';
import hideIcon from '../../assets/hideIcon.svg';
import showIcon from '../../assets/showIcon.svg';
import boardIconIndigo from '../../assets/boardIconIndigo.svg';
import { useState } from 'react';

export default function Sidebar() {
    const [hideSidebar, setHideSidebar] = useState(false);

    //TODO : Load boards on component mount
    return (
        <div>
            {!hideSidebar && (
                <div
                    className="fixed left-0 top-0 w-[19%] bg-white h-screen
     border-gray-200 border-r-[1px] pl-8 pt-5 pb-5"
                >
                    <h1
                        className="bg-white md:w-52 font-rubikMed text-3xl md:text-4xl text-gray-800
          pt-2 pb-2 rounded-md mb-7"
                    >
                        <img
                            className="inline md:h-7 mb-2  mr-1"
                            src={logo}
                            alt="Logo"
                        ></img>
                        Tasker
                    </h1>
                    <h2
                        className="font-rubikMed text-sm text-gray-400 
       tracking-widest mb-6"
                    >
                        ALL BOARDS ()
                    </h2>
                    <div>
                        <p className="text-indigo-500 font-rubikMed hover:cursor-pointer">
                            <img
                                src={boardIconIndigo}
                                className="inline mr-4"
                            />
                            + Create New Board
                        </p>
                    </div>
                </div>
            )}
            <div
                className={`${hideSidebar ? 'bg-indigo-400 rounded-r-full hover:bg-indigo-500 ' : 'w-[19%] hover:bg-gray-100'}
      fixed bottom-8 left-0 pl-8 hover:text-indigo-500
      hover:cursor-pointer  text-gray-400
      `}
                onClick={() => setHideSidebar(!hideSidebar)}
            >
                <p className=" font-rubikMed pt-2 pb-2 ">
                    <img
                        src={hideSidebar ? showIcon : hideIcon}
                        className="inline mr-4"
                    />
                    {!hideSidebar && 'Hide Sidebar'}
                </p>
            </div>
        </div>
    );
}
