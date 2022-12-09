import { AuthType } from './auth.type';

export interface AuthResponseInterface {
  user: AuthType & { token: string };
}
