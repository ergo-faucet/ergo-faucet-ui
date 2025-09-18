'use client';

import { useEffect, useState } from 'react';

import { AlertCircleIcon } from 'lucide-react';
import useSWRMutation from 'swr/mutation';

import { inter } from '@/fonts';
import { swrFetcher } from '@/lib/api';
import { cn } from '@/lib/utils';
import { WalletManager, NautilusConnector, ErgoPayConnector } from '@/lib/wallets';
import { ChallengeResponse } from '@/types';

import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { useViewStore } from './store';
import Wallet from './wallet';

export const WalletSelection = () => {
  const [selected, setSelected] = useState<'nautilus' | 'ergopay'>('nautilus');
  const setState = useViewStore((s) => s.setState);
  const setProof = useViewStore((s) => s.setProof);
  const setChallenge = useViewStore((s) => s.setChallenge);
  const setWalletAddress = useViewStore((s) => s.setWalletAddress);
  const [localError, setLocalError] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [errorSuggestions, setErrorSuggestions] = useState<string[]>([]);

  const { trigger, isMutating, error } = useSWRMutation('/auth/ergo/challenge', swrFetcher);

  useEffect(() => {
    if (error) {
      const message = error instanceof Error ? error.message : String(error);
      setLocalError(message);
      setErrorDescription('Fetching challenge failed');
      setErrorSuggestions(['Check your internet connection', 'Wait a moment and try again']);
    } else {
      setLocalError('');
      setErrorDescription('');
      setErrorSuggestions([]);
    }
  }, [error]);

  const handleConnectButtonOnClick = async () => {
    let wallet;

    switch (selected) {
      case 'nautilus':
        wallet = new WalletManager(new NautilusConnector());
        break;
      case 'ergopay':
        wallet = new WalletManager(new ErgoPayConnector());
        break;
    }
    // reset previous errors
    setLocalError('');
    setErrorDescription('');
    setErrorSuggestions([]);

    // 1) Wallet operations (connect + addresses)
    let address = '';
    let addresses: string[] = [];
    try {
      const connected = await wallet.connect();
      if (!connected) throw new Error('Wallet connection rejected');
      addresses = await wallet.getAddresses();
      const changedAddress = await wallet.getChangeAddress();
      address = changedAddress || addresses[0];
      setWalletAddress(address);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setLocalError(message);
      setErrorDescription('Wallet connection error');
      setErrorSuggestions([
        'Ensure your wallet/extension is installed and enabled',
        'Open the wallet and unlock it',
        'Approve the connection request in your wallet',
        'Reload this page and try again',
      ]);
      return;
    }

    // 2) Backend challenge + signing
    // 2a) Backend challenge (network)
    let challengeResponse: ChallengeResponse;
    try {
      challengeResponse = await trigger({
        method: 'POST',
        body: JSON.stringify({ changedAddress: address, addresses }),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setLocalError(message);
      setErrorDescription('Network error while fetching');
      setErrorSuggestions(['Check your internet connection', 'Wait a moment and try again']);
      return;
    }

    // 2b) Signing
    try {
      const proof = await wallet.signMessage(address, challengeResponse.challenge);
      setChallenge(challengeResponse.challenge);
      setProof(proof);
      setState('login');
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setLocalError(message);
      setErrorDescription('Signing error');
      setErrorSuggestions([
        'Re-open your wallet and try signing again',
        'If prompted, approve the signing request',
        'Retry after a short while',
      ]);
    }
  };

  return (
    <>
      {/* wallets */}
      <div className='flex flex-col space-y-2'>
        {/* Natilus */}
        <Wallet
          onClick={() => setSelected('nautilus')}
          src='/icons/natilus-40x40.png'
          alt='Natilus icon'
          size={40}
          name='Natilus'
          selected={selected == 'nautilus'}
        />
        {/* Ergo Pay */}
        {/* <Wallet
          onClick={() => setSelected('ergopay')}
          alt='Ergo Pay icon'
          size={40}
          name='Ergo Pay'
          selected={selected == 'ergopay'}
        /> */}
      </div>

      {/* connect button */}
      <button
        disabled={isMutating}
        className={`h-11 w-25 cursor-pointer rounded-xl border border-green-400
          ${isMutating ? 'cursor-not-allowed bg-gray-500' : 'bg-green-700 hover:bg-green-900'} text-[17px]
          tracking-wider text-white shadow-[-2px_2px_6px_0_rgba(0,0,0)]/20 shadow-black dark:shadow-white`}
        onClick={handleConnectButtonOnClick}
      >
        {isMutating ? 'Connecting...' : 'Connect'}
      </button>

      {/* alert */}
      {localError && (
        <Alert variant='destructive' className={cn('max-w-[273px]', inter.className)}>
          <AlertCircleIcon />
          <AlertTitle className='text-[14px] font-semibold tracking-wide'>Unable to login</AlertTitle>
          <AlertDescription>
            <p className='text-[11px] font-medium'>{errorDescription || localError}</p>
            {errorSuggestions.length > 0 && (
              <ul className='list-inside list-disc text-[10px]'>
                {errorSuggestions.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            )}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
