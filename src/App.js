import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import CardNotes from './components/CardNotes';
import  { getInitialData } from './utils/index';
import { useState } from 'react';
import CardArchiv from './components/CardArchiv';


function App() {
  let [notes, setNotes] = useState(getInitialData());
  let [filteredNotes, setFilteredNotes] = useState(notes);
  let [hitung, setHitung] = useState(0);
  let [text, setText] = useState('');
  let [title, setTitle] = useState('');
  let [snackbar, setSnackbar] = useState(false);
  let [showDialogNotes, setShowDialogNotes] = useState(false);
  let date = new Date();

  let setId = (array) => {
    return array == '' ? 1 : array[array.length - 1].id + 1;
  }

  let handleForm = (e) => {
    e.preventDefault();
    if (title != '' && text != '') {
      let newNotes = {
        id: setId(notes),
        title: title,
        body: text,
        createdAt: date,
        archived: false,
      }
      let tmpNotes = [...notes, newNotes];
      setNotes(tmpNotes);
      setFilteredNotes(tmpNotes);
      setSnackbar(true);
      hideSnackbar();
      setShowDialogNotes(false);
      setText('');
      setTitle('');
      setHitung(0);
    }
  }

  let removeNotes = (id) => {
    let removed = [...notes].filter(note => note.id !== id);
    setNotes(removed);
    setFilteredNotes(removed);
  }

  let archivNotes = (id) => {
    let newNotes = notes.map(note => {
      if (note.id == id) {
        note.archived ? note.archived = false : note.archived = true;
      }
      return note;
    });
    setNotes(newNotes);
  }

  let handleTitle = (e) => {
    setTitle(e.target.value);
    setHitung(e.target.value.length);
  }

  let hideSnackbar = () => {
    setTimeout(() => {
      setSnackbar(false);
    }, 4 * 1000);
  }

  let searchNotes = (e) => {
    let keyword = e.target.value;
    if (keyword !== '') {
      const hasil = notes.filter((data) => {
        return data.title.toLocaleLowerCase().startsWith(keyword.toLocaleLowerCase());
      })
      setFilteredNotes(hasil);
    } else {
      setFilteredNotes(notes);
    }
  }

  let showInputNotes = () => {
    setShowDialogNotes(true);
  }

  return (
    <div className='flex flex-col w-full max-h-screen min-h-screen overflow-hidden text-sm text-gray-500 bg-gray-100'>

      <div className='flex flex-col min-h-screen grid-cols-6 overflow-hidden lg:grid'>
        
        <div className='flex-col hidden h-full col-span-1 overflow-hidden bg-white shadow-lg lg:flex shadow-gray-300/30'>
          <div className='flex flex-col gap-1 px-6 py-8 border-b border-b-gray-200'>
            <h1 className='font-semibold text-sky-500 text-md'>W-NOTES</h1>
            <span>Tulis notes tanpa batas</span>
          </div>
          <div className='h-full px-3 py-4 overflow-auto'>
            <span className='flex flex-row items-center gap-3 px-3 text-gray-500 '>
              Arsip Notes
            </span>
            <div className='flex flex-col gap-2 px-2 py-2'>
              {filteredNotes.map((data, key) =>
                data.archived ?
                  <CardArchiv key={data.id} id={data.id} title={data.title} date={data.createdAt} body={data.body} isArchive={data.archived} removeNotes={removeNotes} archivNotes={archivNotes} />
                  :
                  '')}
              {filteredNotes.filter(data => data.archived == true) == '' ? <div className='flex col-span-2'>
                <span className='px-1 text-sm text-gray-400'>Tidak Ada Arsip</span>
              </div> : ''}
            </div>
          </div>
        </div>

        <div className='flex flex-col col-span-5 overflow-auto'>
          <Navbar searchNotes={searchNotes}/>
          
          <div className='flex flex-col gap-4 px-4 py-4 lg:px-6 lg:py-6'>
            <span className='text-gray-800'>List Notes</span>
            <div className='flex flex-col grid-cols-3 gap-4 pb-24 sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
              {filteredNotes.map((data, key) =>
                !data.archived ?
                  <CardNotes key={data.id} id={data.id} title={data.title} date={data.createdAt} body={data.body} isArchive={data.archived} removeNotes={removeNotes} archivNotes={archivNotes} />
                  :
                  '')}
              {filteredNotes.filter(data => data.archived == false) == '' ? <div className='flex col-span-2'>
                <span className='text-gray-500'>Tidak Ada Notes</span>
              </div> : ''}
            </div>

            {/* button create notes */}
            {showDialogNotes ?
              ''
              :
              <button className='fixed bottom-0 right-0 flex flex-row items-center gap-3 p-4 mb-6 mr-6 font-semibold text-white transition duration-200 rounded-full shadow-lg bg-sky-500 hover:bg-sky-400' onClick={showInputNotes}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span className='hidden md:flex'>
                  Create Note
                </span>
              </button>
            }

            {/* dialog input */}
            {showDialogNotes ?
              <div className='fixed top-0 bottom-0 left-0 right-0 flex-col items-end justify-end bg-black/20'>
                <form onSubmit={handleForm} className='w-full h-full md:min-h-fit md:w-auto md:h-auto absolute md:bottom-0 md:right-0 md:mb-6 md:mr-6 overflow-hidden bg-white md:rounded-lg shadow-lg md:min-w-[350px] flex flex-col'>
                  <div className='flex flex-row items-center justify-between py-4 pr-1 border-b md:py-1 border-b-gray-200'>
                    <span className='px-4 py-2 font-semibold text-gray-800'>Buat Notes</span>
                    <div className='flex flex-row items-center gap-3 '>
                      <span className='text-xs text-gray-400'>{hitung}/50</span>
                      <button className='p-2 rounded-full hover:bg-gray-200' onClick={() => setShowDialogNotes(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <input className='flex flex-col w-full px-4 py-3 border-b outline-none border-b-gray-200' placeholder='Ttitle' onChange={e => handleTitle(e)} value={title} />
                  <textarea className='flex flex-col flex-grow w-full h-full px-4 py-3 outline-none md:flex-auto md:h-auto' rows="10" placeholder='Notes' onChange={e => setText(e.target.value)} value={text}></textarea>
                  {hitung > 50 ?
                    <button disabled type='submit' className='w-full px-4 py-3 font-semibold text-gray-600 bg-gray-300 cursor-not-allowed'>
                      Create Note
                    </button>
                    :
                    <button type='submit' className='w-full px-4 py-3 font-semibold text-white bg-sky-500 hover:bg-sky-400'>
                      Create Note
                    </button>}
                </form>
              </div>
              :
              ''}


          </div>

        </div>

      </div>
    </div>
  );
}


export default App;
