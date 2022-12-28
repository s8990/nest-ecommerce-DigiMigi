import { AuthType } from '@/user/types/auth.type';

export interface AuthResponseInterface {
  user: AuthType & { token: string };
}
