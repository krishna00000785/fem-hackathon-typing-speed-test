import logoSmall from '../assets/images/logo-small.svg';
import logoPBest from '../assets/images/icon-personal-best.svg';

export function Header() {
  return (
    <header className="-mt-2 mb-6 flex items-center justify-between">
        <img
          src={logoSmall}
          alt="Typing Speed Test Logo"
          className="w-8"
        />
        <div className='mt-2 flex items-center gap-2'>
            <img 
                src={logoPBest}
                alt='Personal Best'
                className='w-4'
            />
            <span className="text-neutral-500">Best:</span>{' '}
            <span className="text-neutral-200 font-medium">0 WPM</span>
        </div>
    </header>
  )
}