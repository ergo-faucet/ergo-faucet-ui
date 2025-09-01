'use client';

import { useState } from 'react';
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
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaKey, setRecaptchaKey] = useState(0); // to reload recaptcha
  const [isAddressValid, setIsAddressValid] = useState(false);

  const isRecaptchaRequired = !!RecaptchaSiteKey;

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
    setRecaptchaKey((prev) => prev + 1); // re-render => mount again after it expires
  };

  const isConfirmDisabled = !isAddressValid || (isRecaptchaRequired && !recaptchaToken);

  return (
    <div
      className={`${inter.className} flex min-h-[466px] w-[387px] flex-col items-center justify-between gap-y-5
        rounded-[27px] border border-gray-300 bg-gray-100 dark:bg-gray-900`}
    >
      <ModalHeader packageName={packageName} />
      <AssetDetails assets={assets} />

      {/* Destination Address */}
      <DestinationAddress className='mb-6 px-9.5' onValidationChange={setIsAddressValid} />

      {/* ReCAPTCHA */}
      {isRecaptchaRequired && (
        <ReCAPTCHA
          key={recaptchaKey}
          sitekey={RecaptchaSiteKey}
          onChange={handleRecaptchaChange}
          onExpired={handleRecaptchaExpired}
        />
      )}

      <ClaimModalButtons disabled={isConfirmDisabled} recaptchaToken={recaptchaToken} />
    </div>
  );
};
