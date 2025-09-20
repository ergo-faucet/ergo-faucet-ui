'use client';

import Countdown, { zeroPad, type CountdownRenderProps } from 'react-countdown';

// Single digit box
const DigitBox = ({ digit }: { digit: string }) => (
  <div
    className='dark:text-gray-1000 mx-[1px] flex h-5 w-4 items-center justify-center rounded-sm border border-gray-900
      bg-gray-800 font-mono text-xs font-bold text-white shadow-sm dark:border-gray-300 dark:bg-gray-200'
  >
    {digit}
  </div>
);

// Card for each unit
const Card = ({ label, value }: { label: string; value: number }) => {
  const digits = zeroPad(value).toString().split('');

  return (
    // Card
    <div className='mx-1 flex flex-col items-center'>
      {/* digit box */}
      <div className='flex'>
        {digits.map((d, i) => (
          <DigitBox key={i} digit={d} />
        ))}
      </div>
      {/* label */}
      <span className='mt-1 text-[12px] tracking-wide text-gray-600 uppercase dark:text-gray-400'>{label}</span>
    </div>
  );
};

// Renderer for countdown
const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
  if (completed) {
    return <span className='pl-2 text-sm text-gray-500 dark:text-gray-400'>Time&apos;s up!</span>;
  }

  return (
    <div className='flex items-center justify-center'>
      <Card label='Day' value={days} />
      <Card label='Hour' value={hours} />
      <Card label='Min' value={minutes} />
      <Card label='Sec' value={seconds} />
    </div>
  );
};

interface CountdownTimerProps {
  date?: Date | number | string;
}

export const CountdownTimer = ({ date }: CountdownTimerProps) => {
  if (!date) return null;
  return <Countdown date={date} renderer={renderer} />;
};
