'use client';

import { Volkhov } from 'next/font/google';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IoWalletSharp } from 'react-icons/io5';

import { apiFetch } from '@/lib/api-fetch';
import { ChallengeResponse, ErgoAuthRequest, ErgoAuthResponse } from '@/types';

import { SheetClose } from '../ui/sheet';
import Wallet from './wallet';

const volkhov = Volkhov({
  subsets: ['latin'],
  weight: ['400'],
});

const ConnectWalletSidebar = () => {
  const [selected, setSelected] = useState<'nautilus' | 'ergopay'>('nautilus');

  const handleConnectButtonOnClick = async () => {
    if (selected == 'nautilus') {
      if (!window.ergoConnector?.nautilus) {
        throw new Error('❌ Nautilus not found');
      }

      const connected: boolean = await window.ergoConnector.nautilus.connect();
      if (!connected) {
        throw new Error('❌ Wallet connection rejected');
      }

      const ergo = await window.ergoConnector.nautilus.getContext();
      const rootAddress: string = await ergo.get_change_address();

      const res = await apiFetch('/auth/ergo/challenge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: rootAddress,
        }),
      });

      const challengeResponse: ChallengeResponse = await res.json();
      const proof = await ergo.sign_data(rootAddress, challengeResponse.challenge);

      const body: ErgoAuthRequest = {
        address: rootAddress,
        challenge: challengeResponse.challenge,
        proof: proof,
        captchaToken: 'test-token',
      };

      const res2 = await apiFetch('/auth/ergo/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!res2.ok) {
        throw new Error('❌ Ergo authentication failed');
      }

      const data2: ErgoAuthResponse = await res2.json();
      console.log(data2.accessToken);
    }
  };

  return (
    // container
    <div
      className={`${volkhov.className} dark:bg-gray-1200 relative flex h-full w-[452px] flex-col items-center
        justify-center space-y-21 bg-[#F8F8F8]`}
    >
      {/* close button */}
      <SheetClose>
        <button className='absolute top-2 left-2 cursor-pointer'>
          <IoMdClose className='h-full w-full text-gray-400' size={30} />
        </button>
      </SheetClose>

      {/* wallet icon and connect text */}
      <div className='top-36 flex flex-col items-center justify-start gap-5'>
        <IoWalletSharp className='text-black dark:text-white' size={80} />
        <span className='text-[22px]'>Connect your wallet</span>
      </div>

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
    </div>
  );
};

export default ConnectWalletSidebar;
