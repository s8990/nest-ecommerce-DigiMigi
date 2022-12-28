import { Controller, Get, Param } from '@nestjs/common';
import { TagEntity } from '@/tag/entities/tag.entity';
import { TagService } from '@/tag/tag.service';

@Controller('v1/tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(): Promise<{ tags: string[] }> {
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
