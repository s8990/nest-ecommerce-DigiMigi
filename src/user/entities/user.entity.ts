import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { hash } from 'bcrypt';
import { ArticleEntity } from '@/article/entities/article.entity';

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

  @Column({ select: false })
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

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[];
}
