interface DeadlineProps {
  startDate: Date;
  endDate: Date;
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
          Start: {startDate.getFullYear()}/{startDate.getMonth()}/{startDate.getDay()}
        </span>
      </div>

      {/* end date */}
      <div className='flex items-center gap-2'>
        <div className='h-3 w-3 rounded-full bg-gray-700 dark:bg-gray-400'></div>
        <span>
          End: {endDate.getFullYear()}/{endDate.getMonth()}/{endDate.getDay()}
        </span>
      </div>
    </div>
  );
};

export default Deadline;
