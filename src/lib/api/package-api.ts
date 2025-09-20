import { PackageRequestBody, PackageRequestResponse } from '@/types';

import { authFetch } from './auth-fetch';

/**
 * Request a package from the faucet
 * @param packageId - The ID of the package to request
 * @param destAddress - The destination address for the package
 * @param captchaToken - The ReCAPTCHA token
 * @returns Promise with the request ID
 */
export const requestPackage = async (
  packageId: number,
  destAddress: string,
  captchaToken: string,
): Promise<PackageRequestResponse> => {
  const body: PackageRequestBody = {
    packageId,
    destAddress,
    captchaToken,
  };

  return authFetch('/controller/packages/request', {
    method: 'POST',
    body: JSON.stringify(body),
  });
};
