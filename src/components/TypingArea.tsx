import React, { useState, useRef, useEffect } from 'react';
import data from '../assets/data/data.json';

{/*
    TypingArea Component 
    TODO: 
        - Load passage based on difficulty and mode
        - Implement timer for timed mode
        - Calculate WPM and accuracy
*/}
export function TypingArea() {

  const [isStarted, setIsStarted] = useState(false);

//const [passage, setPassage] = useState(data.easy[0].text);
  const passage = data.easy[0].text;
  const chars = passage.split('');
  const maxLength = passage.length;

  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  console.log(passage);
  console.log(maxLength);
//useEffect(() => {setPassage(data.easy[0].text);}, []);

  {/* Start Test */}
  const startTest = () => {
    console.log('Starting Test');
    if(isStarted) return;
    setIsStarted(true);
    console.log('Test started');
  }

  useEffect(() => {
    if(isStarted) {
      inputRef.current?.focus();
    }
  }, [isStarted]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    console.log("handleInputChange ", value.length);
    if(value.length > maxLength) {
      return;
    }
    setInputValue(value);
  }

  return (
    <div onClick={startTest} className="relative mt-6 rounded-lg bg-neutral-800 px-4 py-6 min-h-[200px] cursor-text">
      {/* content goes here */}
      <p className={`flex flex-wrap text-base leading-relaxed ${!isStarted ? 'select-none' : ''}`} >
        
        {
          chars.map((char, index) => {
            const cursor = index === inputValue.length;
            const typedChar = inputValue[index];

            let className = 'text-neutral-500';
            if (typedChar !== undefined) {
              if (typedChar === char) {
                className = 'text-green-400';
              } else {
                className = 'text-red-400';
              }
            }

            return(
              <span key={index} className='relative'>
                {cursor && (<span className="absolute -left-[1px] h-6 w-[2px] bg-white animate-pulse" />)}

                <span className={className}>{char === ' ' ? '\u00A0' : char}</span>
              </span>
            );
          })
        }

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
            onClick={() => {startTest()}}
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

      {/* Hidden Value */}
      <textarea
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        className="absolute inset-0 opacity-0 w-full h-full resize-none outline-none"
        aria-label='Typing input'
      />

    </div>
  )
}
