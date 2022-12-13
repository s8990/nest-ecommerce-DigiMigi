import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from '@/article/services/article.service';
import { AuthGuard } from '@/user/guards/auth.guard';
import { User } from '@/user/decorators/user.decorator';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UserEntity } from '@/user/entities/user.entity';
import { ArticleResponseInterface } from '../types/articleResponse.interface';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { ArticlesResponseInterface } from '../types/articlesResponseInterface.type';

@Controller('api/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponseInterface> {
    return await this.articleService.findAll(currentUserId, query);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.createArticle(
      currentUser,
      createArticleDto,
    );
    return this.articleService.buildArticleResponse(article);
  }

  @Get('single/:slug')
  async getSingleArticleBySlug(
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.findOneBySlug(slug);
    return this.articleService.buildArticleResponse(article);
  }

  @Delete('delete/:slug')
  @UseGuards(AuthGuard)
  async deleteArticleBySlug(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ) {
    return await this.articleService.deleteArticleBySlug(slug, currentUserId);
  }

  @Put('update/:slug')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateArticleBySlug(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
    @Body('article') updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.updateArticleBySlug(
      slug,
      currentUserId,
      updateArticleDto,
    );
    return await this.articleService.buildArticleResponse(article);
  }

  @Post(':slug/favorite')
  @UseGuards(AuthGuard)
  async addArticleToFavoritesBySlug(
    @User('id') curretnUserId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.addArticleToFavoritesBySlug(
      slug,
      curretnUserId,
    );
    return this.articleService.buildArticleResponse(article);
  }
}
