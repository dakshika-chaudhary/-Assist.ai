import React, { useEffect } from "react";
import { Gem, Sparkles } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const Dashboard: React.FC  = () => {

  const [creations,setCreations]  = React.useState([]);
 const [loading,setLoading] = React.useState(true)

 const {getToken} = useAuth();

  const getDashboardData = async()=>{
    
    try{
    const {data} = await axios.get('/api/user/get-user-creations',{
      headers:{Authorization:`Bearer ${await getToken()}`}
    })
   if(data.success){
setCreations(data.creations)
   }
   else{
    toast.error(data.message)
   }
  }
    catch(err:any){
     toast.error(err.message)
    }
    setLoading(false);
  }

  useEffect(()=>{
    getDashboardData();
  },[])

  return (
    <div className="h-full overflow-y-scroll p-6 w-full">
     <div className="flex wrap-col justify-start gap-4 flex-wrap">
      <div className=" flex justify-between item-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
        <div>
          <p>Total creations</p>
          <h2>{creations.length}</h2>
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
          <Sparkles className="w-5 text-white"></Sparkles>
        </div>
      </div>
     <div className=" flex justify-between item-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
        <div className="text-slate-600">
          <p>Active Plan</p>
          <Protect plan="premium" fallback="Free">
            <h2 className="font-bold">Premium</h2>
          </Protect>
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-[#FF61C5] to-[#9649e8] text-white flex justify-center items-center">
          <Gem className="w-5 text-white"></Gem>
        </div>
      </div>
     </div>
  {
    loading?(
      <div className="flex justify-center items-center h-3/4">
         <div className="animate-spin rounded-full h-11 w-11 border-3 border-purple-500 border-t-transparent"></div>
        </div>
    ):
       ( 
        <div className='space-y-3 mt-6 max-w-5xl'>
               <p className='text-black font-semibold'>Recent Creations</p>
               {
               creations.map((item:any)=><CreationItem key={item.id} item={item}/>)
               }
            </div>
    )
}
      
    </div>
  );
};

export default Dashboard;

