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
import { CreateProductDto } from '@/product/dto/create-product.dto';
import { UpdateProductDto } from '@/product/dto/update-product.dto';
import { ProductService } from '@/product/services/product.service';
import { ProductResponseInterface } from '@/product/types/productResponse.interface';
import { ProductsResponseInterface } from '@/product/types/productsResponseInterface.type';
import { FindProductsDTO } from '@/product/dto/query/find-products.dto';

@Controller('v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(
    @User('id') currentUserId: number,
    @Query() query: FindProductsDTO,
  ): Promise<ProductsResponseInterface> {
    return await this.productService.findAll(currentUserId, query);
  }

  @HttpCode(201)
  @Post('create')
  @UseGuards(AuthGuard)
  // @UsePipes(new ValidationPipe())
  @UsePipes(new BackendValidationPipe())
  async create(
    @User() currentUser: UserEntity,
    @Body('product') createProductDto: CreateProductDto,
  ): Promise<ProductResponseInterface> {
    const product = await this.productService.createProduct(
      currentUser,
      createProductDto,
    );
    return this.productService.buildProductResponse(product);
  }

  @Get('single/:slug')
  async getSingleProductBySlug(
    @Param('slug') slug: string,
  ): Promise<ProductResponseInterface> {
    const product = await this.productService.findOneBySlug(slug);
    return this.productService.buildProductResponse(product);
  }

  @HttpCode(204)
  @Delete('delete/:slug')
  @UseGuards(AuthGuard)
  async deleteProductBySlug(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ) {
    return await this.productService.deleteProductBySlug(slug, currentUserId);
  }

  @Put('update/:slug')
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async updateProductBySlug(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
    @Body('product') updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseInterface> {
    const product = await this.productService.updateProductBySlug(
      slug,
      currentUserId,
      updateProductDto,
    );
    return await this.productService.buildProductResponse(product);
  }

  @Post(':slug/favorite')
  @UseGuards(AuthGuard)
  async addProductToFavoritesBySlug(
    @User('id') curretnUserId: number,
    @Param('slug') slug: string,
  ): Promise<ProductResponseInterface> {
    const product = await this.productService.addProductToFavoritesBySlug(
      slug,
      curretnUserId,
    );
    return this.productService.buildProductResponse(product);
  }

  @Delete(':slug/favorite')
  @UseGuards(AuthGuard)
  async deleteProductFromFavoritesBySlug(
    @User('id') curretnUserId: number,
    @Param('slug') slug: string,
  ): Promise<ProductResponseInterface> {
    const product = await this.productService.deleteProductFromFavoritesBySlug(
      slug,
      curretnUserId,
    );
    return this.productService.buildProductResponse(product);
  }
}
