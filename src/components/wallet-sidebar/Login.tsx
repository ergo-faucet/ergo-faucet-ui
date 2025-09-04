'use client';

import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { RecaptchaSiteKey } from '@/configs';
import { apiFetch } from '@/lib';
import { ErgoAuthRequest } from '@/types';

import { InfoBox } from './info-box';
import { useViewStore } from './store';

export const Login = () => {
  const { setState, challenge, walletAddress, proof } = useViewStore();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaKey, setRecaptchaKey] = useState(0); // to reload recaptcha

  const isRecaptchaRequired = !!RecaptchaSiteKey;

  // TODO: actually validate it
  const isAddressValid = walletAddress.trim().length > 10;
  const isLoginDisabled = !isAddressValid || (isRecaptchaRequired && !recaptchaToken);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
    setRecaptchaKey((prev) => prev + 1); // re-render => mount again after it expires
  };

  const handleLoginOnClick = async () => {
    // Authenticate
    const body: ErgoAuthRequest = {
      address: walletAddress,
      challenge,
      proof,
      captchaToken: 'test-token',
    };

    //   const authResponse: ErgoAuthResponse =
    await apiFetch('/auth/ergo/auth', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    // go to selection mode again
    setState('selection');
  };
  return (
    <div className='flex h-auto w-[273px] flex-col items-center space-y-4'>
      {/* wallet addres */}
      <InfoBox
        title={'Wallet Address'}
        info={'somerandomtextas1234walletaddress56781234567890abcdefghijklmnopqrstuvwxyz'}
      />

      {/* signing proof */}
      <InfoBox
        title={'Signing Proof'}
        info={'this is a sample signing proof message. 1234567890abcdefghijklmnopqrstuvwxyz'}
      />

      {/* ReCAPTCHA */}
      {isRecaptchaRequired && (
        <ReCAPTCHA
          className='scale-90'
          key={recaptchaKey}
          sitekey={RecaptchaSiteKey}
          onChange={handleRecaptchaChange}
          onExpired={handleRecaptchaExpired}
        />
      )}

      {/* login button */}
      <button
        disabled={isLoginDisabled}
        onClick={handleLoginOnClick}
        className={`h-10.5 w-full rounded-[10px] text-[17px] font-semibold text-white
          ${isLoginDisabled ? 'cursor-not-allowed bg-gray-500' : 'cursor-pointer bg-green-700 hover:bg-green-800'}`}
      >
        Login
      </button>

      {/* alert */}
    </div>
  );
};
