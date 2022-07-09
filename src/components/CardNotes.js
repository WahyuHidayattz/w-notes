import React from 'react'
import { showFormattedDate } from '../utils/index';

export default function CardNotes({ id, title, body, date, removeNotes, archivNotes }) {
    return (
        <div className='flex flex-col px-4 text-sm bg-white rounded-lg shadow-lg shadow-gray-300/30'>
            <h1 className='mt-4 font-semibold text-gray-800'>{title}</h1>
            <span className='text-xs text-gray-400'>{showFormattedDate(date)}</span>
            <span className='h-full mt-2'>
                {body}
            </span>
            <div className='flex flex-row items-center justify-end gap-3 py-2'>
                <button className='p-2 text-gray-400 rounded-full hover:bg-gray-100 hover:text-sky-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" onClick={() => archivNotes(id)}>
                        <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                    </svg>
                </button>
                <button className='p-2 text-gray-400 rounded-full hover:bg-gray-100 hover:text-red-500' onClick={() => removeNotes(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
