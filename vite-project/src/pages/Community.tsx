
// import React from "react";
// import { useUser } from "@clerk/clerk-react";
// import { Heart } from "lucide-react";
// import axios from "axios";
// import { useAuth } from "@clerk/clerk-react";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

// interface Creation {
//   id: number;
//   user_id: string;
//   prompt: string;
//   content: string;
//   type: string;
//   publish: boolean;
//   likes: string[];
//   created_at: string;
//   updated_at: string;
// }

// const Community: React.FC = () => {
//   const [creations, setCreations] = React.useState<Creation[]>([]);
//   const { user } = useUser();
//  const[loading,setLoading] = React.useState(true);
 
// const {getToken} = useAuth();

//   const fetchCreations = async () => {
// try{
//   setLoading(true);
//    const {data} = axios.get('/api/user/get-published-creations',{
//     headers:{Authorization:`Bearer ${await getToken()}`}
//    })
//     if(data.success){
//       setCreations(data.creations)
//     }
//     else{
//      toast.error(data.message)
//     }
// } 
// catch(err:any){
//   toast.error(err.message);
// }
// setLoading(false);
//  };

//  const imageLikeToggle = async(id:any)=>{
//   try{
//     const {data} = await axios.post('/api/user/toggle-like-creation',{id},{
//       headers:{Authorization:`Bearer ${await getToken()}`}
//     })
//   }
//   catch(err:any){

//   }
//  }

//   React.useEffect(() => {
//     if (user) {
//       fetchCreations();
//     }
//   }, [user]);

//   return (
//     <div className="flex-1 h-full flex flex-col gap-6 p-6">
//       <h2 className="text-2xl font-bold text-gray-800">Community Creations</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {creations.map((creation, index) => {
//           const liked = user && creation.likes.includes(user.id);

//           return (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow"
//             >
//               <div className="relative w-full h-60">
//                 <img
//                   src={creation.content}
//                   alt={creation.prompt}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//               </div>

//               <div className="p-4 flex flex-col justify-between">
//                 <p className="text-sm text-gray-600 line-clamp-2 group-hover:line-clamp-none transition-all">
//                   {creation.prompt}
//                 </p>

//                 <div className="flex items-center gap-2 mt-3">
//                   <p className="text-sm text-gray-700">{creation.likes.length}</p>
//                   <Heart
//                     className={`w-5 h-5 hover:scale-110 cursor-pointer transition 
//                       ${liked ? "text-red-500 fill-red-500" : "text-gray-400"}`}
//                   />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Community;

import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Heart } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

interface Creation {
  id: number;
  user_id: string;
  prompt: string;
  content: string;
  type: string;
  publish: boolean;
  likes: string[];
  created_at: string;
  updated_at: string;
}

const Community: React.FC = () => {
  const [creations, setCreations] = React.useState<Creation[]>([]);
  const { user } = useUser();
  const [loading, setLoading] = React.useState(true);

  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user/get-published-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  const imageLikeToggle = async (id: number) => {
    if (!user) return;

    // Optimistic update (instant UI change)
    setCreations((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              likes: c.likes.includes(user.id)
                ? c.likes.filter((uid) => uid !== user.id)
                : [...c.likes, user.id],
            }
          : c
      )
    );

    try {
      await axios.post(
        "/api/user/toggle-like-creation",
        { id },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
    } catch (err: any) {
      toast.error("Failed to toggle like. Please try again.");
      // rollback if failed
      fetchCreations();
    }
  };

  React.useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return (
    <div className="flex-1 h-full flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold text-gray-800">Community Creations</h2>

      {loading ? (
        <p className="text-gray-500">Loading creations...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {creations.map((creation, index) => {
            const liked = user && creation.likes.includes(user.id);

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <div className="relative w-full h-60">
                  <img
                    src={creation.content}
                    alt={creation.prompt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 flex flex-col justify-between">
                  <p className="text-sm text-gray-600 line-clamp-2 group-hover:line-clamp-none transition-all">
                    {creation.prompt}
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <p className="text-sm text-gray-700">
                      {creation.likes.length}
                    </p>
                    <Heart
                      onClick={() => imageLikeToggle(creation.id)}
                      className={`w-5 h-5 hover:scale-110 cursor-pointer transition 
                        ${
                          liked
                            ? "text-red-500 fill-red-500"
                            : "text-gray-400"
                        }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Community;
