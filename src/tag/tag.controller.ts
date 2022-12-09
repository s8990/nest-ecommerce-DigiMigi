import { Controller, Get, Param } from '@nestjs/common';
import { TagService } from '@/tag/tag.service';
import { TagEntity } from './entities/tag.entity';

@Controller('api/tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(): Promise<{tags: string[]}> {
    // return await this.tagService.findAll();
    const tags = await this.tagService.findAll();
    return {
      tags: tags.map((tag) => tag.title),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TagEntity> {
    return await this.tagService.findOne(id);
  }
}