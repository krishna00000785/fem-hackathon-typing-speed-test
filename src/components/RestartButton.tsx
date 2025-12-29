import restart from '../assets/images/icon-restart.svg';

type RestartButtonProps = {
  onClick: () => void;
}

export function RestartButton({ onClick }: RestartButtonProps) {
    return (
        <div className='flex justify-center pt-2'>
            <button
            className="mt-8 rounded-lg bg-white px-6 py-3 text-black font-medium flex items-center gap-2"
            onClick={onClick}
            >
                <span className="text-black">Restart Test</span>
                <img src={restart} alt="restart" className="h-4 w-4" />
            </button>
        </div>
    );
}
