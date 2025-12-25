import { Dropdown } from "./Dropdown";

type ControlsBarProps = {
    difficulty: string;
    setDifficulty: (value: string) => void;
    mode: string;
    setMode: (value: string) => void;
    isTimerRunning: boolean;
};

export function Controls({ difficulty, mode, setMode, isTimerRunning, setDifficulty }: ControlsBarProps) {

    return (
        /* Controls - div */
        <div className="mb-6 flex gap-4">
            {/* Difficulty - div */}
            <div className='flex-1'>
                <Dropdown 
                    value={difficulty}
                    options={['Easy', 'Medium', 'Hard']}
                    onChange={setDifficulty}
                    disabled={isTimerRunning}
                />
            </div>
            {/* Mode - div */}
            <div className='flex-1'>
                <Dropdown 
                    value={mode}
                    options={['Timed (60s)', 'Passage']}
                    onChange={setMode}
                    disabled={isTimerRunning}
                />
            </div>
        </div>
  )
}
