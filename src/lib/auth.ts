import NextAuth, { User } from 'next-auth';
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
      authorize: async (credentials): Promise<User | null> => {
        if (!credentials || !BackendUrl) return null;

        const response = await fetch(`${BackendUrl}/auth/ergo/auth`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(credentials),
        });

        if (!response.ok) return null;

        const data: AuthenticationResponse = await response.json();

        return {
          id: String(data.payload.userId ?? data.payload.address),
          address: data.payload.address,
          name: data.payload.name ?? null,
          accessToken: data.accessToken,
        };
      },
    }),
  ],

  callbacks: {
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.address = token.address as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },

  trustHost: true,
});
