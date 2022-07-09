import React from 'react'
import { showFormattedDate } from '../utils'

export default function CardArchiv({id, title, date, removeNotes, archivNotes}) {
    return (
        <div className='flex flex-col overflow-hidden border border-gray-200 rounded-lg'>
            <div className='flex flex-col px-4 py-2'>
                <span className='text-sm text-gray-800'>{title}</span>
                <span className='text-xs text-gray-400'>{showFormattedDate(date)}</span>
            </div>
            <div className='flex flex-row items-center overflow-hidden text-xs border-t border-t-gray-2000'>
                <button className='flex items-center justify-center flex-grow px-2 py-2 border-r border-r-gray-200 text-lime-500 hover:bg-lime-100' onClick={() => archivNotes(id)}>
                    Publish
                </button>
                <button className='flex items-center justify-center flex-grow px-2 py-2 text-red-500 hover:bg-red-100' onClick={() => removeNotes(id)}>
                    Delete
                </button>
            </div>
        </div>
    )
}
