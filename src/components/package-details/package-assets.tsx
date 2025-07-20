import { TokenDetailsTypes } from '@/types';

import TokenDetails from './token-details';

interface PackageAssetsProps {
  title: string;
  tokens: TokenDetailsTypes[];
}

const PackageAssets = ({ title, tokens }: PackageAssetsProps) => {
  return (
    <div className='flex flex-col items-center justify-center text-lg font-extrabold'>
      <div
        className='relative mb-2 flex h-full w-full items-start justify-start text-gray-900 after:mt-3 after:ml-3
          after:block after:h-0.5 after:w-[78%] after:bg-gray-900 dark:text-gray-200 after:dark:bg-gray-200'
      >
        <span>{title}</span>
      </div>
      {tokens.map((token, idx) => {
        return (
          <TokenDetails
            type={token.type}
            amount={token.amount}
            contractAddress={token.contractAddress}
            href={token.href}
            key={idx}
          />
        );
      })}
    </div>
  );
};

export default PackageAssets;
