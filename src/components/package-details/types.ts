import type { LastRequestStatusType } from '@/types/api/ergo-auth/types';
import { AuthType } from '@/types/authType';

export type { LastRequestStatusType };

export type AuthTaskType = {
  authType: AuthType;
  isCompleted: boolean;
};
