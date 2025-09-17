import React from "react";
import { Eraser, Sparkles } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground: React.FC = () => {

const [input, setInput] = React.useState<File | null>(null);
  const [loading,setLoading] = React.useState(false);
  const [content,setContent] = React.useState('')

const {getToken}=useAuth();

const onSubmitHandler = async(e:any)=>{
  e.preventDefault();
  try{
 setLoading(true)
   const formData = new FormData();
   if(input){
    formData.append('image',input);
  }

   const {data} = await axios.post('/api/ai/remove-image-background',formData,
    {headers:{Authorization:`Bearer ${await getToken()}`}})

  if(data.success){
    setContent(data.content)
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

  return (
     <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700 w-full'>
      {/* left column */}
      <form onSubmit={onSubmitHandler} className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">

          <div className="flex items-center gap-3">
            
            <Sparkles className='w-6 text-[#FF4938]'/>
            <h1 className='text-xl font-semibold'>BackGround Removal</h1>
          </div>
          <p className='mt-6 text-sm font-medium'>Upload Image</p>
          <input 
            onChange={(e) => setInput(e.target.files ? e.target.files[0] : null)}
            accept='image/*'
            type='file' 
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
            required></input>
            
            <p className="text-sm text-gray-400">Support JPG,PNG,and other image format</p>
            
            <button disabled={loading} className="w-full  flex justify-center items-center gap-2 bg-gradient-to-r from-[#f0bf6b] to-[#e66f07] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
              {
                loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
                : <Eraser className='w-5'/>
              }
                Remove BackGround
            </button>
            
      </form>
    
    {/* right column */}
    <div  className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
       <div className="flex gap-3 items-center">
        <Eraser className="w-5 h-5 text-[#eb6a0d]"></Eraser>
        <h1 className="text-xl font-semibold">Processes Image</h1>
       </div>

      {!content?(
         <div className="flex-1 flex justify-center items-center">
        <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
          <Eraser className='w-9 h-9'></Eraser>
          <p>Enter a topic and click "Remove Background" to get started</p>
        </div>
       </div>
      ):(
         <img src={content} alt='image' className='mt-3 w-full h-full'/>
      )}
    </div>
    </div>
  );
};

export default RemoveBackground;

