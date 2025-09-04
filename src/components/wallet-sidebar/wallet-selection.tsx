'use client';

import { useState } from 'react';

import { AlertCircleIcon } from 'lucide-react';

import { inter } from '@/fonts';
import { apiFetch, cn } from '@/lib';
import { WalletManager, NautilusConnector, ErgoPayConnector } from '@/lib/wallets';
import { ChallengeResponse } from '@/types';

import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { useViewStore } from './store';
import Wallet from './wallet';

export const WalletSelection = () => {
  const [selected, setSelected] = useState<'nautilus' | 'ergopay'>('nautilus');
  const [error, setError] = useState('');
  const { setState, setProof, setWalletAddress } = useViewStore();
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

      // Get address
      const address = await wallet.getAddress();
      setWalletAddress(address);

      // Request challenge from backend
      const challengeResponse: ChallengeResponse = await apiFetch('/auth/ergo/challenge', {
        method: 'POST',
        body: JSON.stringify({ address }),
      });

      // Sign challenge
      const proof = await wallet.signMessage(address, challengeResponse.challenge);
      setProof(proof);

      setState('login');
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError('Unknow error happend');
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
        <Wallet
          onClick={() => setSelected('ergopay')}
          alt='Ergo Pay icon'
          size={40}
          name='Ergo Pay'
          selected={selected == 'ergopay'}
        />
      </div>

      {/* connect button */}
      <button
        className='h-11 w-25 cursor-pointer rounded-xl border border-green-400 bg-green-700 text-[17px] tracking-wider
          text-white shadow-[-2px_2px_6px_0_rgba(0,0,0)]/20 shadow-black hover:bg-green-900 dark:shadow-white'
        onClick={handleConnectButtonOnClick}
      >
        Connect
      </button>

      {/* alert */}
      {error && (
        <Alert variant='destructive' className={cn('max-w-[273px]', inter.className)}>
          <AlertCircleIcon />
          <AlertTitle className='text-[14px] font-semibold tracking-wide'>Unable to login</AlertTitle>
          <AlertDescription>
            <p className='text-[11px] font-medium'>{error}</p>
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
