import { getFractionalPart, getWholePart } from '@/lib';

interface FormattedAmountProps {
  amount: bigint;
  decimals: number;
}

export const FormattedAmount = ({ amount, decimals }: FormattedAmountProps) => {
  return (
    <div>
      <span className='text-[13px] font-bold text-black dark:text-white'>{getWholePart(amount, decimals)}.</span>
      <span className='text-[11px] font-semibold text-gray-900 dark:text-gray-200'>
        {getFractionalPart(amount, decimals)}
      </span>
    </div>
  );
};
