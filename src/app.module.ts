import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from 'src/tag/tag.module';
import { AppController } from './app.controller';
import { AppService } from '@/app.service';
import { UserModule } from '@/user/user.module';
import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TagModule,
    UserModule,
    AuthModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
