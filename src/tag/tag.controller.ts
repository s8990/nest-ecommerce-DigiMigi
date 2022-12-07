import { Controller, Get } from '@nestjs/common';
import { TagService } from '@/tag/tag.service';
import { TagEntity } from './entities/tag.entity';

@Controller('tags')
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
}
