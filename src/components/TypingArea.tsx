import React, { useState, useRef, useEffect } from 'react';
import data from '../assets/data/data.json';

{/*
    TypingArea Component 
    TODO: 
      - Need to handle if both passage length and input length matched disable further input
*/}
export function TypingArea() {

  const [isStarted, setIsStarted] = useState(false);
//  const [passage, setPassage] = useState(data.easy[0].text);
  const passage = data.easy[0].text;
  const maxLength = passage.length;
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  console.log(maxLength);
//  useEffect(() => {setPassage(data.easy[0].text);}, []);

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
      <p className={`text-base leading-relaxed text-neutral-400 ${!isStarted ? 'select-none' : ''}`} >
        {/* Need to update the content based on the difficult level */}
        {passage}
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
        className="absolute opacity-0 pointer-events-none"
        aria-label='Typing input'
      />

    </div>
  )
}
