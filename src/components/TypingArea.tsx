import React, { useState, useRef, useEffect } from 'react';
import data from '../assets/data/data.json';
import type { Passage } from '../types/Passage';

{/*
    TypingArea Component 
    TODO: 
        - Handle the test completion when all characters are typed
        - Handle mode selection (Timed / Passage)
*/}

type TypingAreaProps = {
  isTimerRunning: boolean;
  setIsTimerRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setTestStatus: React.Dispatch<React.SetStateAction<"idle" | "running" | "finished">>;
  setPassageLength: React.Dispatch<React.SetStateAction<number>>;
  setAccuracy: React.Dispatch<React.SetStateAction<number>>;
  setTypedChars: React.Dispatch<React.SetStateAction<number>>;
  setTypedCorrectChars: React.Dispatch<React.SetStateAction<number>>;
  setTypedIncorrectChars: React.Dispatch<React.SetStateAction<number>>;
  difficultyKey: string;
};

export function TypingArea({ isTimerRunning, setIsTimerRunning, setTestStatus, setPassageLength, setAccuracy, setTypedChars, setTypedCorrectChars, setTypedIncorrectChars, difficultyKey }: TypingAreaProps) {
  const [isStarted, setIsStarted] = useState(false);

  const rawData = data as Record<string, Passage[]>;
  const [randomIndex] = useState(
    () => Math.floor(Math.random() * rawData[difficultyKey].length)
  );

  const passage = rawData[difficultyKey][randomIndex].text;
  const chars = passage.split('');
  const maxLength = passage.length;
  const [incorrectCharsCount, setIncorrectCharsCount] = useState(0);
  const [totalKeyStrokes, setTotalKeyStrokes] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  {/* Start Test */}
  const startTest = () => {
    if(isStarted) return;
    setIsStarted(true);
  }

  useEffect(() => {
    setPassageLength(passage.length);
  }, [passage.length, setPassageLength]);

  useEffect(() => {
    if(isStarted) {
      inputRef.current?.focus();
    }
  }, [isStarted]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const lastCharIndex = value.length - 1;

    if(value.length > maxLength) {
      return;
    }

    if(!isTimerRunning && value.length == 1) {
      setIsTimerRunning(true);
      setTestStatus("running");
    }

    setTotalKeyStrokes(prev => prev + 1);
    setInputValue(value);

    const typedChar = value[lastCharIndex];
    const targetChar = passage[lastCharIndex];

    if(typedChar !== targetChar) {
      setIncorrectCharsCount(prev => prev + 1);
    }
  }

  useEffect(() => { setTypedChars(inputValue.length);}, [inputValue.length, setTypedChars]);

  const correctCharCount = inputValue.split('')
                            .filter((char, index) => char === passage[index])
                            .length;

  const accuracy = totalKeyStrokes === 0 ? 100 : Math.round((correctCharCount / totalKeyStrokes) * 100);
  
  useEffect(() => { setAccuracy(accuracy); }, [accuracy, setAccuracy]);
  useEffect(() => { setTypedCorrectChars(correctCharCount); }, [correctCharCount, setTypedCorrectChars]);
  useEffect(() => { setTypedIncorrectChars(incorrectCharsCount); }, [incorrectCharsCount, setTypedIncorrectChars]);

  useEffect(() => {
    if(isTimerRunning && inputValue.length === passage.length) {
      setIsTimerRunning(false);
      setTestStatus("finished");
    }
  }, [inputValue.length, isTimerRunning, passage.length, setIsTimerRunning, setTestStatus]);

  
  return (
    <div onClick={startTest} className="relative mt-6 rounded-lg bg-neutral-800 px-4 py-6 min-h-[200px] cursor-text">
      {/* content goes here */}
      <p className={`flex flex-wrap text-base md:text-2xl lg:text-3xl leading-relaxed md:leading-loose ${!isStarted ? 'select-none' : ''}`} >
        
        {
          chars.map((char, index) => {
            const cursor = index === inputValue.length;
            const testCompleted = inputValue.length === passage.length;
            const typedChar = inputValue[index];

            let className = 'text-neutral-500';
            if (typedChar !== undefined) {
              if (typedChar === char) {
                className = 'text-green-400';
              } else {
                className = 'text-red-400 underline decoration-red-600 decoration-2';
              }
            }

            return(
              <span key={index} className='relative'>
                {cursor && !testCompleted && (<span className="absolute -left-[1px] h-[1.0em] w-[2px] bg-white animate-pulse top-[0.1em]" />)}

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
