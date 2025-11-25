import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { BackendUrl } from '@/configs';
import { AuthenticationResponse, RefreshTokenResponse } from '@/types';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Ergo Wallet',
      credentials: {
        address: { label: 'Address', type: 'text' },
        challenge: { label: 'Challenge', type: 'text' },
        proof: { label: 'Proof', type: 'text' },
        captchaToken: { label: 'Captcha', type: 'text' },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;
        if (!BackendUrl) {
          console.error('Backend URL is not configured');
          return null;
        }

        try {
          const response = await fetch(`${BackendUrl}/auth/ergo/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              address: credentials.address,
              challenge: credentials.challenge,
              proof: credentials.proof,
              captchaToken: credentials.captchaToken,
            }),
          });

          if (!response.ok) {
            return null;
          }

          const data: AuthenticationResponse = await response.json();

          if (!data?.accessToken) {
            return null;
          }

          return {
            id: String(data.payload.userId ?? data.payload.address),
            address: data.payload.address,
            name: data.payload.name ?? null,
            accessToken: data.accessToken,
          };
        } catch (error) {
          console.error('Auth.js credentials authorize failed', error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        // 1. Initial sign in
        token.accessToken = (user as unknown as { accessToken?: string }).accessToken;
        token.address = (user as unknown as { address?: string }).address;
        token.name = user.name ?? null;
        token.expiresAt = Date.now() + 60 * 60 * 1000; // 1h from now
      }

      // 2. If token is still valid, return it
      if (token.expiresAt && Date.now() < (token.expiresAt as number)) {
        return token;
      }

      // 3. If token expired, try to refresh
      try {
        if (!BackendUrl) throw new Error('Backend URL missing');

        // Attempt refresh via backend (HttpOnly cookie based)
        const response = await fetch(`${BackendUrl}/auth/ergo/refresh-token`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Failed to refresh token');

        const data: RefreshTokenResponse = await response.json();

        if (data.success && data.newToken) {
          return {
            ...token,
            accessToken: data.newToken,
            expiresAt: Date.now() + 60 * 60 * 1000, // extend another hour
          };
        }
      } catch (error) {
        console.error('Error refreshing access token', error);
      }

      // If refresh fails, fall back to old token (which will likely fail auth checks) or clear it
      return { ...token, error: 'RefreshAccessTokenError' };
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken as string | undefined;
      // @ts-expect-error error handling
      session.error = token.error;

      if (session.user) {
        if (token.address) {
          session.user.address = token.address as string;
        }

        if (typeof token.name === 'string') {
          session.user.name = token.name;
        }
      }

      return session;
    },
  },
  trustHost: true,
});
