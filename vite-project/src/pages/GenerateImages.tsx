import React from "react";
import { Image, Sparkles } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages: React.FC  = () => {
    
  const ImageStyle = [
    'Realistic','Ghibli style','Anime style','Cartoon style','Fantasy style','Realistic style','3D style','Portrait style'
  ]
  
  const [selectedStyle,setSelectedStyle] = React.useState('Realistic');
   const [input,setInput] = React.useState('');
   const [publish,setPublish] = React.useState(false);
  const [loading,setLoading] = React.useState(false);
    const [content,setContent] = React.useState('')
  

   const {getToken} = useAuth();

  const onSubmitHandler = async(e:any)=>{
    e.preventDefault();
    try{
    setLoading(true);

    const prompt = `Generate an image of ${input} in the style ${selectedStyle}`

    const {data} = await axios.post('/api/ai/generate-image',{prompt,publish},
    {headers:{Authorization:`Bearer ${await getToken()}`}})

  if(data.success){
    setContent(data.secure_url)
  }
  else{
    toast.error(data.message)
  }
}
  catch(err:any){
     toast.error(err.message)
  }
  setLoading(false)
    
  }

  return (
     <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700 w-full'>
      {/* left column */}
      <form onSubmit={onSubmitHandler} className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">

          <div className="flex items-center gap-3">
            
            <Sparkles className='w-6 text-[#059e3a]'/>
            <h1 className='text-xl font-semibold'>AI Image Generator</h1>
          </div>
          <p className='mt-6 text-sm font-medium'>Describe Your Image</p>
          <textarea 
           onChange={(e)=>setInput(e.target.value)}
            value={input}
            rows={4} 
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
            placeholder="Write about the image that you want to see..."
            required/>
            <p className='mt-4 text-sm font-medium '>Style</p>

            <div className="flex flex-wrap sm:max-w-9/11">
              {
               ImageStyle.map((item)=>(
                <span 
                onClick={()=>{setSelectedStyle(item)}}
                 className={`text-xs px-4 py-1 border  m-1 rounded-full cursor-pointer  ${selectedStyle===item ? 'bg-green-50 text-green-700 border  border-gray-600':'text-gray-500 border border-gray-300'}`} 
                 key={item}
                 >{item}</span>
               ))
              }
            </div>
            <div className='my-6 flex items-center gap-2'>
              <label className="relative cursor-pointer">
                <input 
                type="checkbox"
                 onChange={(e)=>setPublish(e.target.checked)} 
                 checked={publish} 
                 className="sr-only peer">
                 </input>
                 <div className="w-9 h-5 bg-gray-300  rounded-full peer-checked:bg-green-500 transition"></div>
                 <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
              </label>
              <p className="text-sm">Make this Image Public</p>
            </div>
            
           
            <button disabled={loading} className="w-full  flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
             {
                loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
                : <Image className='w-5'/>
              }
              
               Generate Image
            </button>
            
      </form>
    
    {/* right column */}
    <div  className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
       <div className="flex gap-3 items-center">
        <Image className="w-5 h-5 text-[#059e3a]"></Image>
        <h1 className="text-xl font-semibold">Generated Image</h1>
       </div>

      {
        !content?(
           <div className="flex-1 flex justify-center items-center">
        <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
          <Image className='w-9 h-9'></Image>
          <p>Enter a topic and click "Generate Image" to get started</p>
        </div>
       </div>
        ):(
 <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
            <div className="reset-tw flex justify-center">
  <img src={content} alt="Generated" className="rounded-lg max-h-96 object-contain"/>

              </div>
          </div>
        )
      }
    </div>
    </div>
  );
};

export default GenerateImages;

