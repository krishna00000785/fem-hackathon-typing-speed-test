import './App.css'
import { Controls } from './components/Controls'
import { Header } from './components/Header'
import { StatsBar } from './components/StatsBar'
import { TypingArea } from './components/TypingArea'
import { Container } from './layout/Container'
import React, { useState, useEffect } from 'react';

function App() {

  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);


  useEffect(() => {
    console.log("isTimerRunning ", isTimerRunning);
    if(!isTimerRunning) return;

    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning]);
  
  return (
      <Container>
        <div className='space-y-6'>
          <Header />
          <StatsBar 
            timeElapsed={timeElapsed} 
            />
          <Controls />
          <TypingArea 
            isTimerRunning={isTimerRunning}
            setIsTimerRunning={setIsTimerRunning}
            />
        </div>
      </Container>
  )
}

export default App
