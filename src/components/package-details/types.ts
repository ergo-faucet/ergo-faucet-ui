import { AuthType } from '@/types/authType';

export type LastRequestStatus = 'success' | 'rejected' | 'pending';

export type AuthTaskType = {
  authType: AuthType;
  isCompleted: boolean;
  status?: string;
};
