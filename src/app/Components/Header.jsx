"use client"
import React from 'react'

import Link from 'next/link'
function Header() {
   


  return (
    
    <div className='bg-gray-100 shadow-2xl '>
    <div className=" p-4  shadow-md flex w-full justify-around py-2 items-center gap-8">
      <p className="text-lg text-center font-serif">
        Your Notes will be added by clicking the next button.
      </p>
      <div>
        <Link href="/Create"
           className="bg-gray-100  py-2 px-4 rounded-full shadow-xl hover:shadow-2xl">+
          
        </Link>
      </div>
    </div>

  </div>
   
  )
}

export default Header
