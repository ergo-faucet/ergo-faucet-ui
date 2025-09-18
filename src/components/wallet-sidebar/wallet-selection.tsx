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

  const { trigger, isMutating, error } = useSWRMutation('/auth/ergo/challenge', swrFetcher);

  useEffect(() => {
    if (error) {
      const message = error instanceof Error ? error.message : String(error);
      setLocalError(message);
    } else {
      setLocalError('');
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
    try {
      // Connect wallet
      const connected = await wallet.connect();
      if (!connected) throw new Error('Wallet connection rejected');

      // Get addresses (used + unused) and change address
      const addresses = await wallet.getAddresses();
      const changedAddress = await wallet.getChangeAddress();
      const address = changedAddress || addresses[0];
      setWalletAddress(address);

      // Request challenge from backend
      const challengeResponse: ChallengeResponse = await trigger({
        method: 'POST',
        body: JSON.stringify({ changedAddress: address, addresses }),
      });

      // Sign challenge
      const proof = await wallet.signMessage(address, challengeResponse.challenge);
      setChallenge(challengeResponse.challenge);
      setProof(proof);

      setState('login');
    } catch (error) {
      if (error instanceof Error) setLocalError(error.message);
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
            <p className='text-[11px] font-medium'>{localError}</p>
            <ul className='list-inside list-disc text-[10px]'>
              <li>Check if you have the tools needed</li>
              <li>Try after a while</li>
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
