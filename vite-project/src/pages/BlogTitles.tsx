import React from "react";
import {  Hash } from "lucide-react";
import { Sparkles } from "lucide-react";
import axios from "axios";
import Markdown from "react-markdown";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles: React.FC = () => {
  
const blogCategories = [
  'General','Technology','Business','Health','Lifestyle','Education','Travle','Food'
]

const [selectedCategory,setSelectedCategory] = React.useState('General');
  const [input,setInput] = React.useState('')
  const [loading,setLoading] = React.useState(false);
  const [content,setContent] = React.useState('')

const {getToken}=useAuth();

const onSubmitHandler = async(e:any)=>{
  e.preventDefault();
  try{
   setLoading(true)
   const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`

   const {data} = await axios.post('/api/ai/generate-blog-title',{prompt},
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
  setLoading(false)
}

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700 w-full'>
      {/* left column */}
      <form  onSubmit={onSubmitHandler} className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">
            
          <div className="flex items-center gap-3">
            
            <Sparkles className='w-6 text-[#8E37EB]'/>
            <h1 className='text-xl font-semibold'>AI Title Generator</h1>
          </div>
          <p className='mt-6 text-sm font-medium'>Keyword</p>
          <input 
            onChange={(e)=>setInput(e.target.value)}
            value={input}
            type='text' 
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
            placeholder="The future of artificial intelligence is...."
            required></input>
            <p className='mt-4 text-sm font-medium'>Category</p>

           <div className="flex flex-wrap sm:max-w-9/11">
              {
               blogCategories.map((item)=>(
                <span 
                onClick={()=>{setSelectedCategory(item)}}
                 className={`text-xs  px-4 py-1 border   m-1 rounded-full p-1 ${selectedCategory==item ? 'bg-purple-50 text-purple-700 border  border-gray-600':'text-gray-500 border border-gray-300'}`} 
                 key={item}
                 >{item}</span>
               ))
              }
            </div>
            <br></br>
           
            <button  disabled={loading} className="w-full  flex justify-center items-center gap-2 bg-gradient-to-r from-[#f817f4] to-[#3e78e3] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
               {
                loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
                : <Hash className='w-5'/>
              }
             
               Generate Title
            </button>
            
      </form>
    
    {/* right column */}
    <div  className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
       <div className="flex gap-3 items-center">
        <Hash className="w-5 h-5 text-[#8E37EB]"></Hash>
        <h1 className="text-xl font-semibold">Generated Title</h1>
       </div>

       {
        !content?(
       <div className="flex-1 flex justify-center items-center">
        <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
          <Hash className='w-9 h-9'></Hash>
          <p>Enter a topic and click "Generate title" to get started</p>
        </div>
       </div>):(
         <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
            <div className="reset-tw"><Markdown>{content}</Markdown>
              </div>
          </div>
       )
       }

    </div>
    </div>
  );
};

export default BlogTitles;


