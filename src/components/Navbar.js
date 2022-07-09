import React from 'react'

export default function Navbar({searchNotes}) {
    return (
        <div className='sticky top-0 flex flex-row items-center justify-between px-6 py-3 bg-white shadow-lg shadow-gray-300/30'>
        <span className='font-semibold text-gray-800'>W-Notes</span>
        <div className='flex flex-row items-center gap-3'>
          <input className='px-3 py-2 transition duration-200 bg-gray-100 border border-gray-100 rounded-lg outline-none focus:border focus:border-sky-400 focus:ring focus:ring-sky-200' placeholder='Cari Sesuatu' onChange={searchNotes} />
        </div>
      </div>
    )
}
