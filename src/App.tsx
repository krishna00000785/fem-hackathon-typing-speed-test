import './App.css'
import { Controls } from './components/Controls'
import { Header } from './components/Header'
import { StatsBar } from './components/StatsBar'
import { TypingArea } from './components/TypingArea'
import { Container } from './layout/Container'
import { useState, useEffect } from 'react';
import { DifficultyLabelToKeyMap } from './types/DifficultyLabelToKeyMap'
import { getBestScore, setBestScore } from './utils/storage'
import { Results } from './components/Results'
import { fireConfetti } from "./utils/confetti"
import { RestartButton } from './components/RestartButton'

function App() {

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [accuracy, setAccuracy] = useState(100);
  const [typedChars, setTypedChars] = useState(0);
  const [typedCorrectChars, setTypedCorrectChars] = useState(0);
  const [typedIncorrectChars, setTypedIncorrectChars] = useState(0);
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
  const [isBestWpm, setIsBestWpm] = useState<number>(0); // 0 - First Run; 1 - New Best; -1 - Not Best

  const [hasCompleted, setHasCompleted] = useState(false);
  const isTimedCompleted = mode === 'Timed (60s)' && typedChars === passageLength && timeElapsed < 60;
  const isPassageCompleted = mode === 'Passage' && typedChars === passageLength;

  const isTestCompleted = !hasCompleted && (isTimedCompleted || isPassageCompleted);
  const [testStatus, setTestStatus] = useState<"idle" | "running" | "finished">("idle");
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    setBestWpm(getBestScore(storageKey)); 
  }, [storageKey]);

  useEffect(() => {
    if (!isTestCompleted) return;
  
    setHasCompleted(true);
    setIsTimerRunning(false);

    if(bestWpm === 0) {
      setIsBestWpm(0);
    } else if(bestWpm > 0 && wpm > bestWpm) {
      setIsBestWpm(1);
    } else {
      setIsBestWpm(-1);
    }

    if (wpm > bestWpm) {
      setBestWpm(wpm);
      setBestScore(storageKey, wpm);
    }

  }, [isTestCompleted, wpm, bestWpm, hasCompleted, storageKey]);

  useEffect(() => { 
    if (isBestWpm === 1) {
      fireConfetti()
    }
  }, [isBestWpm])

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
  
  const handleDifficultyChange = (newDifficulty: string) => {
    setDifficulty(newDifficulty);

    // reset stats and timer
    setIsTimerRunning(false);
    setTestStatus("idle");
    setHasCompleted(false);
    setTypedChars(0);
    setAccuracy(100);
    setTypedCorrectChars(0);
    setTypedIncorrectChars(0);

    setTimeElapsed(mode === 'Timed (60s)' ? 60 : 0);
  }

  const handleModeChange = (newMode: string) => {
    setMode(newMode);

    // reset stats and timer
    setIsTimerRunning(false);
    setTestStatus("idle");
    setHasCompleted(false);
    setTypedChars(0);
    setAccuracy(100);
    setTypedCorrectChars(0);
    setTypedIncorrectChars(0);

    setTimeElapsed(newMode === 'Timed (60s)' ? 60 : 0);
  };

  const handleRestart = () => {
console.log('Restarting test...');
    setIsTimerRunning(false);
    setTestStatus("idle");
    setHasCompleted(false);

    setTypedChars(0);
    setAccuracy(100);
    setTypedCorrectChars(0);
    setTypedIncorrectChars(0);

    setTimeElapsed(mode === 'Timed (60s)' ? 60 : 0);
    setResetKey((prev) => prev + 1);
  };

  return (
      <Container>
        <div className='space-y-8 md:space-y-16'>
          <Header 
            bestWpm={bestWpm}
          />
          {hasCompleted ? (
              <>
                <Results
                  wpm={wpm}
                  isBestWpm={isBestWpm}
                  accuracy={accuracy}
                  typedCharCount={typedChars}
                  typedCorrectChars={typedCorrectChars}
                  typedIncorrectChars={typedIncorrectChars}
                  passageLength={passageLength}
                  onRestart={handleRestart}
                />
              </>
            ) : (
              <>
                {/* Mobile: stacked | Desktop: side by side */}
                <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 md:items-center">
                  <StatsBar 
                    timeElapsed={timeElapsed}
                    accuracy={accuracy} 
                    wpm={wpm}
                    />
                  <Controls 
                    difficulty={difficulty}
                    setDifficulty={handleDifficultyChange}
                    mode={mode}
                    setMode={handleModeChange}
                    isTimerRunning={isTimerRunning}
                  />
                </div>
                <TypingArea 
                  key={`${difficultyKey}-${mode}-${resetKey}`}
                  isTimerRunning={isTimerRunning}
                  setTestStatus={setTestStatus}
                  setIsTimerRunning={setIsTimerRunning}
                  setPassageLength={setPassageLength}
                  setAccuracy={setAccuracy}
                  setTypedChars={setTypedChars}
                  setTypedCorrectChars={setTypedCorrectChars}
                  setTypedIncorrectChars={setTypedIncorrectChars}
                  difficultyKey={difficultyKey}
                />
                {/* Restart Button */}
                {
                  testStatus === "running" && (
                    <RestartButton 
                      onClick={handleRestart}
                     />
                  )
                }
              </>
            )}
        </div>
      </Container>
  )
}

export default App
