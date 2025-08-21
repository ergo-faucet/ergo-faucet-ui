import { inter } from '@/fonts';
import { Asset } from '@/types';

import AssetDetails from './asset-details';
import { ClaimModalButtons } from './claim-modal-buttons';
import { DestinationAddress } from './DestinationAddress';
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
      className={`${inter.className} gap flex min-h-[466px] w-[387px] flex-col items-center justify-between
        rounded-[27px] border border-gray-300 bg-gray-100 px-9.5 dark:bg-gray-900`}
    >
      <ModalHeader packageName={packageName} />
      <AssetDetails assets={assets} />
      <DestinationAddress destAddress={destinationAddress} />
      <ClaimModalButtons />
    </div>
  );
};
