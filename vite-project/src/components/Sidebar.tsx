import React from "react";
import { useUser ,useClerk} from "@clerk/clerk-react";
import { Eraser, FileText, Hash, House, Scissors, SquarePen, Users ,Image, LogOut} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Protect } from "@clerk/clerk-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const navItems = [
    {to:'/ai', label: 'Dashboard' , icon: House},
    {to:'/ai/write-article', label: 'Write Article' , icon: SquarePen},
    {to:'/ai/blog-title', label: 'Blog Title' , icon: Hash},
    {to:'/ai/generate-images', label: 'Generate Images' , icon: Image},
    {to:'/ai/remove-background', label: 'Remove Background' , icon: Eraser},
    {to:'/ai/remove-object', label: 'Remove Object' , icon: Scissors},
    {to:'/ai/review-resume', label: 'Review Resume' , icon: FileText},
    {to:'/ai/community', label: 'Community' , icon: Users},
]

const Sidebar: React.FC<SidebarProps> = ({sidebarOpen, setSidebarOpen}) => {

    const {user} = useUser();
    const {signOut} = useClerk();

    return(
        <div className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-16 bottom-0 ${sidebarOpen ? 'left-0' : '-left-60'} transition-all duration-300 z-50`}>
         <div className="w-full my-7 items-center ">
           <img
      src={user?.imageUrl}
      alt=""
      className="h-10 w-10 rounded-full ml-16"
    />
    <div>
      <h1 className="font-medium ml-4">{user?.fullName}</h1>
      </div>
           <div className="mt-8 flex flex-col">
            {navItems.map(({to,label,icon:Icon})=>(
               <NavLink key={to} to={to} end={to === '/ai'} onClick={()=>setSidebarOpen(false)} className={({isActive})=>`flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 ${isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white' : ''}`}>
                  {({isActive})=>(
                    <>
                      <Icon className={`w-5 h-5 mr-2 ${isActive ? 'text-white': ''}`}/>
                      {label}
                    </>
                  )}
               </NavLink>
            ))}
           </div>
         </div>
          {/* <div className="mt-8 flex -ml-8 ">
             <img src={user?.imageUrl} alt='' className="ml-12 h-10 w-10 rounded-full"/>
             <div className="ml-2">
                <h1 className="w-20">{user?.fullName}</h1>
                <p className="text-xs text-gray-500"><Protect plan='premium' fallback='Free'>Premium</Protect></p>
                  <LogOut
             onClick={() => signOut()} className="ml-14 text-4.5 text-gray-400 hover:text-gray-700 transaction cursor-pointer"/>
             </div>
          
           </div>

        */}

        <div className="mt-8 flex items-center justify-between px-4 w-full border-2 border-gray-200 ">
  {/* Left side: avatar + name + plan */}
  <div className="flex items-center space-x-3">
    <img
      src={user?.imageUrl}
      alt=""
      className="h-10 w-10 rounded-full"
    />
    <div>
      <h1 className="font-medium">{user?.fullName}</h1>
      <p className="text-xs text-gray-500">
        <Protect plan="premium" fallback="Free">Premium</Protect>
      </p>
    </div>
  </div>

  {/* Right side: logout */}
  <LogOut
    onClick={() => signOut()}
    className="w-5 h-5 text-gray-400 hover:text-gray-700 cursor-pointer"
  />
</div>
</div>
    )
}

export default Sidebar;