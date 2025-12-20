import { Dropdown } from "./Dropdown";
import { useState } from 'react';



export function Controls() {

    const [difficulty, setDifficulty] = useState('Easy');
    const [mode, setMode] = useState('Timed (60s)');

    return (
    /* Controls - div */
    <div className="mb-6 flex gap-4">
        {/* Difficulty - div */}
        <div className='flex-1'>
            <Dropdown 
                value={difficulty}
                options={['Easy', 'Medium', 'Hard']}
                onChange={setDifficulty}
             />
        </div>
        {/* Mode - div */}
        <div className='flex-1'>
            <Dropdown 
                value={mode}
                options={['Timed (60s)', 'Passage']}
                onChange={setMode}
             />
        </div>
    </div>
  )
}
