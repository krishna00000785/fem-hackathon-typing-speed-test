import { useEffect, useState } from 'react';
import data from '../assets/data/data.json';

export function TypingArea() {

  const [isStarted, setIsStarted] = useState(false);
//  const [passage, setPassage] = useState(data.easy[0].text);

//  useEffect(() => {setPassage(data.easy[0].text);}, []);

  return (
    <div className="relative mt-6 rounded-lg bg-neutral-800 px-4 py-6">
      {/* content goes here */}
      <p className={`text-sm leading-relaxed text-neutral-400 ${!isStarted ? 'select-none' : ''}`} >
        {data.easy[0].text}
      </p>

      {/* Overlay */}
      {!isStarted && (
        <div className='
          absolute inset-0 
          flex flex-col 
          items-center justify-center
          gap-3 
          bg-neutral-900/70
          rounded-lg'
        >

          <button
            onClick={() => setIsStarted(true)}
            className='
              rounded-md
              bg-blue-500
              px-6 py-3
              text-sm font-semibold text-white
              hover:bg-blue-600
              transition
            '
          >
            Start Typing Test
          </button>

          <p className='text-sm text-neutral-300'>
            or click the text and start typing
          </p>

        </div>
      )}

    </div>
  )
}
