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
