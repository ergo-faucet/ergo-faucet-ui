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
    <div className=''>{lastRequestDate?.toString()}</div>
  );
};
