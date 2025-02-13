import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@/user/guards/auth.guard';
import { User } from '@/user/decorators/user.decorator';
import { BackendValidationPipe } from '@/shared/pipes/backendValidation.pipe';
import { UserEntity } from '@/user/entities/user.entity';
import { UpdateArticleDto } from '@/article/dto/update-article.dto';
import { ArticleService } from '@/article/services/article.service';
import { CreateArticleDto } from '@/article/dto/create-article.dto';
import { ArticleResponseInterface } from '@/article/types/articleResponse.interface';
import { ArticlesResponseInterface } from '@/article/types/articlesResponseInterface.type';

@Controller('v1/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponseInterface> {
    return await this.articleService.findAll(currentUserId, query);
  }

  @Get('feed')
  @UseGuards(AuthGuard)
  async getArticleFeed(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponseInterface> {
    return await this.articleService.getArticleFeed(currentUserId, query);
  }

  @HttpCode(201)
  @Post('create')
  @UseGuards(AuthGuard)
  // @UsePipes(new ValidationPipe())
  @UsePipes(new BackendValidationPipe())
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

  @HttpCode(204)
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
  @UsePipes(new BackendValidationPipe())
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

  @Delete(':slug/favorite')
  @UseGuards(AuthGuard)
  async deleteArticleFromFavoritesBySlug(
    @User('id') curretnUserId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.deleteArticleFromFavoritesBySlug(
      slug,
      curretnUserId,
    );
    return this.articleService.buildArticleResponse(article);
  }
}
