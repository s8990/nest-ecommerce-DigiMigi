import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from '@/tag/tag.module';
import { AppController } from './app.controller';
import { AppService } from '@/app.service';
import { UserModule } from '@/user/user.module';
import { dataSourceOptions } from 'db/data-source';
import { AuthMiddleware } from '@/user/middlewares/auth.middleware';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), TagModule, UserModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
