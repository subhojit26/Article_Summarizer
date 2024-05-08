import React from 'react'
import {logo} from '../assets';

const Hero = () => {
  return (
    <header className='flex flex-col items-center justify-center w-full'>
      <nav className='flex justify-between w-full mb-10 items-center'>
        <img src={logo} alt='logo' className='w-32 h-32 object-contain'/>
        <button className='black_btn' type='button' onClick={()=>{
            window.open('https://github.com/subhojit26', '_blank')
        }}>
            Github
        </button>
      </nav>

      <h1 className='head_text '>
        Summarize Articles with <br className='max-md:hidden'/>
        <span className='orange_gradient'>OpenAI GPT-4</span>
      </h1>
      <h2 className='desc'>
        Simplify your reading with Summize, an open source article summarizer that transforms long articles into short summaries.
      </h2>
    </header>
  )
}

export default Hero
