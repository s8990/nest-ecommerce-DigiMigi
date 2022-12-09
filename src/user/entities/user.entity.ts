import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';
import { hash } from 'bcrypt';

// export enum UserRole {
//   SUPER_ADMIN = 'Super Admin',
//   ADMIN = 'Admin',
//   NOMER_USER = 'Normal User',
// }

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column({ default: '' })
  email: string;

  @Column()
  mobile: string;

  @Column()
  password: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;

  @Column({ default: false })
  isActive: boolean;

  //   @Column({
  //     type: 'enum',
  //     enum: UserRole,
  //     default: UserRole.GHOST,
  //   })
  //   role: UserRole[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
