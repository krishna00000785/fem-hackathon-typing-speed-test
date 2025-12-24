import './App.css'
import { Controls } from './components/Controls'
import { Header } from './components/Header'
import { StatsBar } from './components/StatsBar'
import { TypingArea } from './components/TypingArea'
import { Container } from './layout/Container'
import { useState, useEffect } from 'react';
import { DifficultyLabelToKeyMap } from './types/DifficultyLabelToKeyMap'
import { getBestScore, setBestScore } from './utils/storage'

function App() {

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [accuracy, setAccuracy] = useState(100);
  const [typedChars, setTypedChars] = useState(0);
  const [passageLength, setPassageLength] = useState(0);
  const [difficulty, setDifficulty] = useState('Easy');
  const [mode, setMode] = useState('Timed (60s)');
  const [timeElapsed, setTimeElapsed] = useState(() => {
    return mode === 'Timed (60s)' ? 60 : 0;
  });

  const timeMinutes = timeElapsed / 60;
  const wpm = timeMinutes > 0 ? Math.round((typedChars / 5) / timeMinutes) : 0;

  const difficultyKey = Object.entries(DifficultyLabelToKeyMap).find(([label]) => label === difficulty)?.[1] as string;

  const storageKey = `typing-best:${difficulty}:${mode}`;
  const [bestWpm, setBestWpm] = useState<number>(() => getBestScore(storageKey));

  const [hasCompleted, setHasCompleted] = useState(false);
  const isTimedCompleted = mode === 'Timed (60s)' && typedChars === passageLength && timeElapsed < 60;
  const isPassageCompleted = mode === 'Passage' && typedChars === passageLength;

  const isTestCompleted = !hasCompleted && (isTimedCompleted || isPassageCompleted);

  useEffect(() => {
    setBestWpm(getBestScore(storageKey)); 
  }, [storageKey]);

  useEffect(() => {
    if (!isTestCompleted) return;
  
    setHasCompleted(true);
    setIsTimerRunning(false);

    if (wpm > bestWpm) {
      setBestWpm(wpm);
      setBestScore(storageKey, wpm);
    }

  }, [isTestCompleted, wpm, bestWpm, hasCompleted, storageKey]);

  useEffect(() => {
    if(!isTimerRunning) return;

    const timer = setInterval(() => {
      if(mode === 'Timed (60s)') {
        setTimeElapsed((prev) => {
          if(prev <= 1) {
            clearInterval(timer);
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      } else {
        setTimeElapsed((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, mode]);
  
  return (
      <Container>
        <div className='space-y-6'>
          <Header 
            wpm={wpm}
          />
          <StatsBar 
            timeElapsed={timeElapsed}
            accuracy={accuracy} 
            wpm={wpm}
            />
          <Controls 
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            mode={mode}
            setMode={setMode}
            isTimerRunning={isTimerRunning}
          />
          <TypingArea 
            isTimerRunning={isTimerRunning}
            setIsTimerRunning={setIsTimerRunning}
            setPassageLength={setPassageLength}
            setAccuracy={setAccuracy}
            setTypedChars={setTypedChars}
            difficultyKey={difficultyKey}
            />
        </div>
      </Container>
  )
}

export default App
