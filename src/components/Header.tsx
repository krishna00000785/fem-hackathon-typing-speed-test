import logoSmall from '../assets/images/logo-small.svg';
import logoPBest from '../assets/images/icon-personal-best.svg';

type HeaderBarProps = {
    bestWpm: number;
};

export function Header({ bestWpm }: HeaderBarProps) {
  return (
    <header className="-mt-2 mb-6 flex items-center justify-between md:mb-14 md:mt-4">
        <img
          src={logoSmall}
          alt="Typing Speed Test Logo"
          className="w-8 md:w-10 transition-all"
        />
        <div className='flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 md:px-6 md:py-3 border border-neutral-800 shadow-sm'>
            <img 
                src={logoPBest}
                alt='Personal Best'
                className='w-4 md:w-5'
            />
            <div className="flex items-center gap-1.5 text-sm md:text-base">
                <span className="text-neutral-500 font-normal">Personal Best:</span>
                <span className="text-white font-bold tracking-tight">{bestWpm} WPM</span>
            </div>
        </div>
    </header>
  )
}