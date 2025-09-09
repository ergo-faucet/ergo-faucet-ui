import { Asset } from '@/types';

import { LineAfterText } from './line-after-text';
import TokenDetails from './token-details';

interface PackageAssetsProps {
  assets: Asset[];
}

const PackageAssets = ({ assets }: PackageAssetsProps) => {
  return (
    <div className='flex h-auto w-full flex-col items-start justify-start overflow-hidden'>
      <LineAfterText text='Assets' />
      {assets.map((asset, idx) => {
        return <TokenDetails key={idx} asset={asset} />;
      })}
    </div>
  );
};

export default PackageAssets;
