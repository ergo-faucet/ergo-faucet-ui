import { ExplorerURL } from '@/configs';

/**
 * Generates the full URL for viewing a specific token on the blockchain explorer.
 * @param tokenId - The unique identifier of the token.
 * @returns A string containing the complete explorer URL for the given token.
 */
export const generateTokenUrl = (tokenId: string) => {
  return `${ExplorerURL}/en/token/${tokenId}`;
};
