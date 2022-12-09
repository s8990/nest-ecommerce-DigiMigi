import { UserEntity } from '@/user/entities/user.entity';

export type UserType = Omit<UserEntity, 'hashPassword'>;
