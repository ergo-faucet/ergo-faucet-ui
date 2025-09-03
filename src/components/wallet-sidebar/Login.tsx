'use client';

import { apiFetch } from '@/lib';
import { ErgoAuthRequest } from '@/types';

import { InfoBox } from './info-box';
import { useViewStore } from './store';

export const Login = () => {
  const { setState, challenge, walletAddress, proof } = useViewStore();
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
    <>
      {/* wallet addres */}
      <InfoBox title={'Wallet Address'} info={walletAddress} />

      {/* signing proof */}
      <InfoBox title={'Signing Proof'} info={proof} />

      {/* recaptcha */}

      {/* login button */}
      <button onClick={handleLoginOnClick} className='cursor-pointer'>
        Login
      </button>

      {/* alert */}
    </>
  );
};
