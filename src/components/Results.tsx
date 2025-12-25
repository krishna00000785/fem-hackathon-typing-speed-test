import { Stat } from "./Stat";
import restart from '../assets/images/icon-restart.svg';
import complete from '../assets/images/icon-completed.svg';

type ResultsProps = {
  wpm: number;
  accuracy: number;
  typedCharCount: number;
  passageLength: number;
  onRestart: () => void;
}

export function Results({ wpm, accuracy, typedCharCount, passageLength, onRestart}: ResultsProps) {
    return (
        <div className="mt-8 flex flex-col items-center text-center">
            {/* Icon */}
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-200/20">
                <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center text-black text-xl font-bold">
                    <img src={complete} alt="complete" className="h-12 w-12" />
                </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold">Test Complete!</h2>
            <p className="mt-1 text-sm text-neutral-400">
                Solid run. Keep pushing to beat your high score.
            </p>

            {/* Stats */}
            <div className="mt-6 w-full space-y-3">
                <Stat label="WPM" value={wpm} />
                <Stat label="Accuracy" value={`${accuracy}%`} highlight="red" />
                <Stat 
                    label="Characters"
                    value={`${typedCharCount}/${passageLength}`}
                    highlight="green"
                    />
            </div>

            {/* Restart Button */}
            <button 
                onClick={onRestart}
                className="mt-8 rounded-lg bg-white px-6 py-3 text-black font-medium flex items-center gap-2"
                >
                    <span className="text-black">Go Again</span>
                    <img src={restart} alt="restart" className="h-4 w-4" />
            </button>
        </div>
    );
}