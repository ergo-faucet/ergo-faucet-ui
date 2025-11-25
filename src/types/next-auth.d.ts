import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    error?: string;
    user?: DefaultSession['user'] & {
      address?: string;
    };
  }

  interface User {
    accessToken: string;
    address: string;
    name?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    address?: string;
    expiresAt?: number;
    error?: string;
  }
}
