type StatusBarProps = {
  timeElapsed: number;
};

export function StatsBar({ timeElapsed }: StatusBarProps) {
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;

  return (
    <div className="mb-6 flex rounded bg-neutral-900 px-4 py-3 text-center">
        {/* WPM */}
        <div className="flex flex-1 flex-col items-center">
            <span className="text-sm text-neutral-400">WPM:</span>
            <span className="text-lg font-semibold text-neutral-0">0</span>
        </div>

        {/* divider */}
        <div className="mx-4 w-px bg-neutral-700" />

        {/* Accuracy */}
        <div className="flex flex-1 flex-col items-center">
            <span className="text-sm text-neutral-400">Accuracy:</span>
            <span className="text-lg font-semibold text-neutral-0">0%</span>
        </div>

        {/* divider */}
        <div className="mx-4 w-px bg-neutral-700" />

        {/* Time */}
        <div className="flex flex-1 flex-col items-center">
            <span className="text-sm text-neutral-400">Time:</span>
            <span className="text-lg font-semibold text-neutral-0">{`${minutes}:${seconds.toString().padStart(2, '0')}`}</span>
        </div>
    </div>
  )
}
