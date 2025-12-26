import { Stat } from "./Stat";
import restart from '../assets/images/icon-restart.svg';
import complete from '../assets/images/icon-completed.svg';

type ResultsProps = {
  wpm: number;
  accuracy: number;
  typedCharCount: number;
  typedCorrectChars: number;
  passageLength: number;
  onRestart: () => void;
}

export function Results({ wpm, accuracy, typedCharCount, typedCorrectChars, passageLength, onRestart}: ResultsProps) {

    const errorChars = passageLength - typedCorrectChars;
console.log('typedCorrectChars ', typedCorrectChars);
console.log('wpm ', wpm);
console.log('accuracy ', accuracy);
console.log('typedCharCount ', typedCharCount);
console.log('passageLength ', passageLength);

    return (
        <div className="mt-20 flex flex-col items-center text-center">
            {/* Icon */}
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-200/10">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-200/15">
                    <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center text-black text-xl font-bold">
                        <img src={complete} alt="complete" className="h-12 w-12" />
                    </div>
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
                <Stat label="Accuracy" value={`${accuracy}%`} highlight={`${accuracy == 100 ? "green" : "red" }`} />
                <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-left">
                    <p className="text-sm text-neutral-400">Characters:</p>
                    <p className='mt-1 text-2xl font-semibold'>
                        <span className="text-green-400">{typedCorrectChars}</span>
                        <span className="text-neutral-500">/</span> 
                        <span className="text-red-400">{errorChars}</span>
                    </p>
                </div>
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