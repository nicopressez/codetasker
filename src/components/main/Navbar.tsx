import dotsIcon from "../../assets/dotsIcon.svg"

export default function Navbar() {
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
     <button>
      <img src={dotsIcon} />
     </button>
     </div>
    </div>
  )
}
