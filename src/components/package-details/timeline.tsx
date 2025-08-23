import { inter } from '@/fonts';

import { CountdownTimer } from './countdown';
import { formatDate } from './format-date';
import { LineAfterText } from './line-after-text';
import { StatusBadge } from './status-badge';
import { LastRequestStatus } from './types';

export interface TimelineProps {
  lastRequestStatus?: LastRequestStatus;
  lastRequestDate?: Date;
  cooldownTime?: Date | number | string;
}

export const Timeline = ({ lastRequestStatus, lastRequestDate, cooldownTime }: TimelineProps) => {
  // this component is optional
  if (!lastRequestStatus && !cooldownTime) return null;

  return (
    // container
    <div className='flex max-h-32 w-72.5 flex-col gap-3'>
      {/* last request */}
      {lastRequestDate && (
        <div className='flex h-15 w-full flex-col items-center justify-center'>
          <LineAfterText text='Last Request' />
          <div className='flex h-full w-full justify-between'>
            <span className={`${inter.className} ml-2 text-xs`}>{lastRequestDate && formatDate(lastRequestDate)}</span>
            <StatusBadge status={lastRequestStatus} />
          </div>
        </div>
      )}

      {/* cooldown time */}
      {cooldownTime && (
        <div className='flex h-15 w-full flex-col items-start justify-start gap-0'>
          <LineAfterText text='Cooldoown Time' />
          <CountdownTimer date={cooldownTime} />
        </div>
      )}
    </div>
  );
};
