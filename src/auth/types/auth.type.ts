import { UserEntity } from '@/user/entities/user.entity';

export type AuthType = Omit<UserEntity, 'hashPassword'>;
