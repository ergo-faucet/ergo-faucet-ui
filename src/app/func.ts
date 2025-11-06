import { refreshAccessToken } from '@/lib/api/auth-fetch';
import { useWalletStore } from '@/store/wallet-store';

export const func = () => {
  const setAddress = useWalletStore.getState().setAddress;

  // read from localStorage
  try {
    const storedAddress = localStorage.getItem('walletAddress');
    if (storedAddress) {
      setAddress(storedAddress);
      console.log('Wallet address restored from localStorage:', storedAddress);
    }
  } catch (err) {
    console.error('Failed to read wallet address from localStorage:', err);
  }

  // refresh access token
  refreshAccessToken()
    .then((a) => {
      console.log('Access token refreshed successfully');
      console.log(a.valueOf());
    })
    .catch((err) => {
      console.error('Failed to refresh access token:', err);
    });
};
