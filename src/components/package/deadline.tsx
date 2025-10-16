interface DeadlineProps {
  startDate?: Date;
  endDate?: Date;
  className?: string;
}

const Deadline = ({ startDate, endDate, className = '' }: DeadlineProps) => {
  return (
    // container
    <div
      className={`flex h-3 w-full items-center justify-between text-[13px] text-gray-700 dark:text-gray-400
        ${className}`}
    >
      {/* start date */}
      <div className='flex items-center gap-2'>
        <div className='h-3 w-3 rounded-full border-3 border-gray-700 bg-transparent dark:border-gray-400'></div>
        <span>
          Start: {startDate ? `${startDate.getFullYear()}/${startDate.getMonth() + 1}/${startDate.getDate()}` : '—'}
        </span>
      </div>

      {/* end date */}
      <div className='flex items-center gap-2'>
        <div className='h-3 w-3 rounded-full bg-gray-700 dark:bg-gray-400'></div>
        <span>End: {endDate ? `${endDate.getFullYear()}/${endDate.getMonth() + 1}/${endDate.getDate()}` : '—'}</span>
      </div>
    </div>
  );
};

export default Deadline;
