import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from '@/article/services/article.service';
import { ArticleController } from '@/article/controllers/article.controller';
import { ArticleEntity } from './entities/article.entity';
import { UserEntity } from '@/user/entities/user.entity';
import { FollowEntity } from '@/profile/entities/follow.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity, UserEntity, FollowEntity]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
