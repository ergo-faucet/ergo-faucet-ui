import { Asset } from '@/types';

import AssetDetails from './asset-details';
import ModalHeader from './modal-header';

interface ClaimModalProps {
  packageName: string;
  destinationAddress: string;
  assets: Asset[];
}

export const ClaimModal = ({ packageName, destinationAddress, assets }: ClaimModalProps) => {
  return (
    // Modal container
    <div
      className='flex h-[466px] w-[387px] flex-col items-center justify-start gap-3 rounded-[27px] bg-gray-100
        dark:bg-gray-900'
    >
      <ModalHeader packageName={packageName} />
      <AssetDetails assets={assets} />
      {destinationAddress}
    </div>
  );
};
