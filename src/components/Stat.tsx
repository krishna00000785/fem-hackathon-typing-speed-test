export function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number;
  highlight?: 'red' | 'green';
}) {
  const color =
    highlight === 'red'
      ? 'text-red-400'
      : highlight === 'green'
      ? 'text-green-400'
      : 'text-white';

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-left">
      <p className="text-sm text-neutral-400">{label}:</p>
      <p className={`mt-1 text-2xl font-semibold ${color}`}>{value}</p>
    </div>
  );
}