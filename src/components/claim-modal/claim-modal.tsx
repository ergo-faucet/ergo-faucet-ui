'use client';

import ReCAPTCHA from 'react-google-recaptcha';

import { RecaptchaSiteKey } from '@/configs';
import { inter } from '@/fonts';
import { Asset } from '@/types';

import AssetDetails from './asset-details';
import { ClaimModalButtons } from './claim-modal-buttons';
import { DestinationAddress } from './DestinationAddress';
import ModalHeader from './modal-header';

interface ClaimModalProps {
  packageName: string;
  assets: Asset[];
}

export const ClaimModal = ({ packageName, assets }: ClaimModalProps) => {
  return (
    // Modal container
    <div
      className={`${inter.className} flex min-h-[466px] w-[387px] flex-col items-center justify-between gap-y-5
        rounded-[27px] border border-gray-300 bg-gray-100 dark:bg-gray-900`}
    >
      <ModalHeader packageName={packageName} />
      <AssetDetails assets={assets} />
      <DestinationAddress className='px-9.5' />
      <ReCAPTCHA sitekey={RecaptchaSiteKey} />
      <ClaimModalButtons />
    </div>
  );
};
