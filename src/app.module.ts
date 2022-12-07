import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from 'src/tag/tag.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormconfig from '@/database/postgres/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TagModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
