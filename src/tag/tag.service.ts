import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from '@/tag/entities/tag.entity';
// import { ArrayContains } from 'typeorm';
@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async findAll(): Promise<TagEntity[]> {
    return await this.tagRepository.find();
  }

  findOne(id: number): Promise<TagEntity> {
    return this.tagRepository.findOneBy({ id });
  }
}
