import { getFractionalPart, getWholePart } from '@/lib';

interface FormattedAmountProps {
  amount: bigint;
  decimal: number;
}

export const FormattedAmount = ({ amount, decimal }: FormattedAmountProps) => {
  return (
    <div>
      <span className='text-[13px] font-bold text-black dark:text-white'>{getWholePart(amount, decimal)}.</span>
      <span className='text-[11px] font-semibold text-gray-900 dark:text-gray-200'>
        {getFractionalPart(amount, decimal)}
      </span>
    </div>
  );
};
