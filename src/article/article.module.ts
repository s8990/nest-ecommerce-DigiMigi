import { Module } from '@nestjs/common';
import { ArticleService } from '@/article/services/article.service';
import { ArticleController } from '@/article/controllers/article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
