import React from 'react'
import {AiToolsData} from '../assets/assets.ts'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const AiTools: React.FC = () => {
    const navigate = useNavigate();
    const {user}=useUser();

    return(
        <div>
        <div className="px-4 sm:px-20 xl:px-32 my-24 text-center">
            <h2 className='text-slate-700 text-[42px] font-semibold '>
                Powerful AI Tools
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
                Explore our suite of AI-powered tools designed to enhance your productivity and creativity. From intelligent content generation to advanced data analysis, our tools leverage cutting-edge technology to help you achieve more with less effort.
            </p>
        </div>

        <div className='flex flex-wrap mt-10 justify-center'>
             {AiToolsData.map((tool,index)=>(
                 <div key={index} className='p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:translate-y-1 transition-all duration-300 cursor-pointer'
                  onClick={()=>user && navigate(tool.path)}
             >
                <tool.Icon className='w-12 h-12 p-3 text-white rounded-xl' style={{background:`linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`}}/>
                <h3 className="font-bold ">{tool.title}</h3>
                <p className='text-gray-600'>{tool.description}</p>
             </div>)
             )}
        </div>

        </div>
    )
}

export default AiTools;