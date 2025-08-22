import { inter } from '@/fonts';

import { CountdownTimer } from './countdown';
import { formatDate } from './format-date';
import { LineAfterText } from './line-after-text';
import { StatusBadge } from './status-badge';
import { LastRequestStatus } from './types';

interface TimelineProps {
  lastRequestStatus?: LastRequestStatus;
  lastRequestDate?: Date;
  cooldownTime?: Date;
}

export const Timeline = ({ lastRequestStatus, lastRequestDate, cooldownTime }: TimelineProps) => {
  // this component is optional
  if (lastRequestStatus === undefined && cooldownTime === undefined) return null;

  return (
    // container
    <div className='flex h-32 w-72.5 flex-col gap-3'>
      {/* last request */}
      <div className='flex h-15 w-full flex-col items-center justify-center'>
        <LineAfterText text='Last Request' />
        <div className='flex w-full justify-between'>
          <span className={`${inter.className} ml-2 text-xs`}>{lastRequestDate && formatDate(lastRequestDate)}</span>
          <StatusBadge status={lastRequestStatus} />
        </div>
      </div>

      {/* cooldown time */}
      <div className='flex h-15 w-full flex-col gap-0'>
        <LineAfterText text='Cooldoown Time' />
        <CountdownTimer date={cooldownTime} />
      </div>
    </div>
  );
};
