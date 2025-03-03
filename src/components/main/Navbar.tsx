import { useState } from "react"
import dotsIcon from "../../assets/dotsIcon.svg"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { getAuth, signOut } from "firebase/auth"


export default function Navbar() {

  const [toggleMenu, setToggleMenu] = useState(false)

  const auth = getAuth()
  const signOutButton = () => {
    signOut(auth)
      .then(() =>{
      // Signout successful
      })
      .catch((err) => {
        // Error
      })
  }

  return (
    <div className="w-full h-[13%] bg-white border-b-[1px]
    border-gray-200 flex items-center justify-between">
     <h1 className=" font-rubikMed ml-[21rem] text-3xl text-gray-800">
      Board Title
     </h1>
     <div className="flex items-center space-x-6 mr-8">
     <button
             
       className="pt-3 pb-3 pl-6 pr-6 bg-indigo-500 rounded-full text-white
                        font-semibold hover:cursor-pointer hover:brightness-105
                        active:brightness-110"
                       
                    >
                        + Add New Task
     </button>
     <Menu as="div" className="relative font-rubik">
      <MenuButton>
        <img src={dotsIcon} data-testid="navSettings"/>
      </MenuButton>
      <MenuItems
      className="absolute mt-2 mr-2 right-0 w-52 flex
      flex-col bg-white gap-1 drop-shadow-xl rounded-lg
        pt-2 pb-2 justify-center">
        <MenuItem>
          <p className="pl-6 text-gray-500 block data-[focus]:bg-gray-100
          ">
            Edit Board
          </p>
        </MenuItem>
        <MenuItem>
          <p className="pl-6 text-red-500 block data-[focus]:bg-gray-100
          hover:cursor-pointer">
            Delete Board
          </p>
        </MenuItem>
        <MenuItem>
          <a onClick={signOutButton}
          className="pl-6 text-red-500 block data-[focus]:bg-gray-100 
           hover:cursor-pointer">
            Sign out
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
     </div>
    </div>
  )
}
