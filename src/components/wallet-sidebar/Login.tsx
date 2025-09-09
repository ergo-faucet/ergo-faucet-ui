'use client';

import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { AlertCircleIcon } from 'lucide-react';
import useSWRMutation from 'swr/mutation';

import { RecaptchaSiteKey } from '@/configs';
import { inter } from '@/fonts';
import { swrFetcher, cn } from '@/lib';
import { useWalletStore } from '@/store/wallet-store';
import { AuthenticationBody } from '@/types';

import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { SheetClose } from '../ui/sheet';
import { InfoBox } from './info-box';
import { useViewStore } from './store';

export const Login = () => {
  const setState = useViewStore((s) => s.setState);
  const challenge = useViewStore((s) => s.challenge);
  const walletAddress = useViewStore((s) => s.walletAddress);
  const proof = useViewStore((s) => s.proof);
  const setGlobalWalletAddress = useWalletStore((s) => s.setAddress);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaKey, setRecaptchaKey] = useState(0); // to reload recaptcha
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const isRecaptchaRequired = !!RecaptchaSiteKey;

  // TODO: actually validate it
  const isAddressValid = walletAddress.trim().length > 10;
  const isLoginDisabled = !isAddressValid || (isRecaptchaRequired && !recaptchaToken);

  const { trigger, isMutating, error } = useSWRMutation('/auth/ergo/auth', swrFetcher);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
    setRecaptchaKey((prev) => prev + 1); // re-render => mount again after it expires
  };

  const handleLoginOnClick = async () => {
    // Authenticate
    const body: AuthenticationBody = {
      address: walletAddress.toString(),
      challenge: challenge.toString(),
      proof: proof.toString(),
      captchaToken: 'test-token',
    };

    await trigger({
      method: 'POST',
      body: JSON.stringify(body),
    });

    // go to selection mode again
    setState('selection');

    // persist wallet address globally for navbar display
    setGlobalWalletAddress(walletAddress);

    // close the sheet
    closeRef.current?.click();
  };

  return (
    <div className='flex h-auto w-[273px] flex-col items-center space-y-2'>
      {/* hidden close button to programmatically close the sheet */}
      <SheetClose asChild>
        <button ref={closeRef} className='hidden' />
      </SheetClose>
      {/* wallet addres */}
      <InfoBox title={'Wallet Address'} info={walletAddress} />

      {/* signing proof */}
      <InfoBox title={'Signing Proof'} info={proof} />

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
        disabled={isLoginDisabled || isMutating}
        onClick={handleLoginOnClick}
        className={`h-10.5 w-full rounded-[10px] text-[17px] font-semibold tracking-widest text-white
          ${isLoginDisabled || isMutating ? 'cursor-not-allowed bg-gray-500' : 'cursor-pointer bg-green-700 hover:bg-green-800'}`}
      >
        {isMutating ? 'Logging in...' : 'Login'}
      </button>

      {/* alert */}
      {error && (
        <Alert variant='destructive' className={cn('w-full', inter.className)}>
          <AlertCircleIcon />
          <AlertTitle className='text-[14px] font-semibold tracking-wide'>Unable to login</AlertTitle>
          <AlertDescription>
            <p className='text-[11px] font-medium'>{(error as Error).message}</p>
            <ul className='list-inside list-disc text-[10px]'>
              <li>Check your internet connection</li>
              <li>Try after a while</li>
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
