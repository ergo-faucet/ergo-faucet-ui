import { refreshAccessToken } from '@/lib/api/auth-fetch';

export const func = () => {
  refreshAccessToken()
    .then((a) => {
      console.log('Access token refreshed successfully');
      console.log(a.valueOf());
    })
    .catch((err) => {
      console.error('Failed to refresh access token:', err);
    });
};
