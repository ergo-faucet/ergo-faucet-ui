'use client';

import { useEffect, useState } from 'react';

import { AlertCircleIcon } from 'lucide-react';

import { inter } from '@/fonts';
import { apiFetch } from '@/lib/api';
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
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (localError) {
      setErrorDescription('Network or wallet error occurred');
    } else {
      setErrorDescription('');
      setErrorSuggestions([]);
    }
  }, [localError]);

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

    // show connecting state
    setIsConnecting(true);

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
      setErrorSuggestions(['Ensure your wallet/extension is installed and enabled', 'Reload this page and try again']);
      setIsConnecting(false);
      return;
    }

    let challengeResponse: ChallengeResponse;
    try {
      // Request challenge from backend
      challengeResponse = await apiFetch('/auth/ergo/challenge', {
        method: 'POST',
        body: JSON.stringify({ changedAddress: address, addresses }),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setLocalError(message);
      setErrorDescription('Network error while fetching challenge');
      setIsConnecting(false);
      return;
    }

    // Signing
    try {
      const proof = await wallet.signMessage(address, challengeResponse.challenge);
      setChallenge(challengeResponse.challenge);
      setProof(proof);
      setState('login');
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setLocalError(message);
      setErrorDescription('Signing error');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <>
      {/* wallets + connect button with same width */}
      <div className='flex w-[273px] flex-col items-center space-y-3'>
        {/* wallets */}
        <div className='flex w-full flex-col space-y-2'>
          <Wallet
            onClick={() => setSelected('nautilus')}
            src='/icons/natilus-40x40.png'
            alt='Natilus icon'
            size={40}
            name='Natilus'
            selected={selected == 'nautilus'}
          />
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
          disabled={isConnecting}
          className={`h-10.5 w-full rounded-[10px] text-[17px] font-semibold tracking-widest text-white
            ${isConnecting ? 'cursor-not-allowed bg-gray-500' : 'cursor-pointer bg-green-700 hover:bg-green-800'}`}
          onClick={handleConnectButtonOnClick}
        >
          {isConnecting ? 'Connecting...' : 'Connect'}
        </button>
      </div>

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
