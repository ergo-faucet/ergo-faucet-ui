import { refreshAccessToken } from '@/lib/api/auth-fetch';
import { useWalletStore } from '@/store/wallet-store';

export const updateLoginState = () => {
  const setAddress = useWalletStore.getState().setAddress;

  // refresh access token
  refreshAccessToken()
    .then((a) => {
      if (a.valueOf()) {
        console.log('Access token refreshed successfully');
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
      } else console.log('failed to refresh');
    })
    .catch((err) => {
      console.error('Failed to refresh access token:', err);
    });
};
