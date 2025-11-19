import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { BackendUrl } from '@/configs';
import { AuthenticationResponse } from '@/types';

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
        token.accessToken = (user as unknown as { accessToken?: string }).accessToken;
        token.address = (user as unknown as { address?: string }).address;
        token.name = user.name ?? null;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken as string | undefined;

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
