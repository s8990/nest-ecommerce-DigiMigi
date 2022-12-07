import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from '@/tag/tag.controller';
import { TagService } from '@/tag/tag.service';
import { TagEntity } from '@/tag/entities/tag.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TagEntity])],
    controllers: [TagController],
    providers: [TagService]
})
export class TagModule {}