"use client"
import React from 'react'

const Navbar = () => {
  return (
    <div>
      <div className="Nav-Container w-screen bg-purple-600 text-white mb-10">
        <nav className='flex justify-around py-5'>
            <div className='cursor-pointer font-bold text-lg'>NUTask</div>
            <ul className='flex justify-around gap-x-5'>
                <li className='cursor-pointer  text-white hover:underline'>Home</li>
                <li className='cursor-pointer  text-white hover:underline'>Your Tasks</li>
            </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
