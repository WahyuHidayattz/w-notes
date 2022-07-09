import React from 'react'

export default function Dialog(props) {
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center hidden w-full min-h-screen bg-slate-800/40 backdrop-filter backdrop-blur-lg'>
            <div className='flex flex-col gap-4 px-8 py-6 rounded-md shadow-lg bg-slate-700 text-slate-200 max-w-[450px]'>
                <h1 className='text-lg font-semibold text-white'>{props.title} ?</h1>
                <span>{props.message}</span>
                <div className='flex flex-row items-center justify-end w-full gap-4'>
                    <button className='px-4 py-2 rounded-md hover:bg-slate-600'>Batal</button>
                    <button className='px-4 py-2 bg-red-500 rounded-md shadow-md text-slate-900 hover:bg-red-400'>Hapus</button>
                </div>
            </div>
        </div>
    )
}
