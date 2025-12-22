import './App.css'
import { Controls } from './components/Controls'
import { Header } from './components/Header'
import { StatsBar } from './components/StatsBar'
import { TypingArea } from './components/TypingArea'
import { Container } from './layout/Container'
import { useState, useEffect } from 'react';
import { DifficultyLabelToKeyMap } from './types/DifficultyLabelToKeyMap'

function App() {

  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [accuracy, setAccuracy] = useState(100);
  const [typedChars, setTypedChars] = useState(0);
  const timeMinutes = timeElapsed / 60;
  const wpm = timeMinutes > 0 ? Math.round((typedChars / 5) / timeMinutes) : 0;
  const [difficulty, setDifficulty] = useState('Easy');

  const difficultyKey = Object.entries(DifficultyLabelToKeyMap)
                        .find(([label]) => label === difficulty)?.[1] as string;

  console.log("App State: ", {difficulty, difficultyKey});

  useEffect(() => {
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
            accuracy={accuracy} 
            wpm={wpm}
            />
          <Controls 
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
          <TypingArea 
            isTimerRunning={isTimerRunning}
            setIsTimerRunning={setIsTimerRunning}
            setAccuracy={setAccuracy}
            setTypedChars={setTypedChars}
            difficultyKey={difficultyKey}
            />
        </div>
      </Container>
  )
}

export default App
