import React from 'react'
import {logo} from '../assets'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        <nav className='flex  justify-between items-center flex-row w-full mb-10 pt-3'>
            <img src ={logo} alt= "sumz_log" className='w-28 object-contain'/>
            <button type='button' onClick={() => window.open('https://github.com/Patrikdeve')}
            className='black_btn group flex flex-row items-center justify-center'>
                <span className='font-satoshi text-[1rem] transition duration-200 leading-relaxed ml-2 text-slate-200 group-hover:text-black'>Visit My GitHub</span>
                <i className="bi bi-arrow-right-circle w-7 h-7 text-[1rem] ml-2 mt-2"></i>
            </button>
        </nav>
        <h1 className='head_text'>
            Summarizer Article with <br className='max-md:hidden'/>
            <span className='orange_gradient'>OpenAI GPT-4</span>
        </h1>
        <h2 className='desc'>
            Simplify your Reading with the GPT-4 summarizer, an open-source article summarizer that transforms lengthy articles into clear and concise summaries. 
        </h2>
        {/* <h1 className='give_btn'>
            Go Ahead and Give it a Try!!
        </h1> */}
    </header>
  )
}

export default Hero
