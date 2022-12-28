import { UserEntity } from '@/user/entities/user.entity';
import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import slugify from 'slugify';
import { ProductCategoryEntity } from '@/productcategory/entities/productcategory.entity';
import { FollowEntity } from '@/profile/entities/follow.entity';
import { CreateProductDto } from '@/product/dto/create-product.dto';
import { UpdateProductDto } from '@/product/dto/update-product.dto';
import { ProductsResponseInterface } from '@/product/types/productsResponseInterface.type';
import { ProductResponseInterface } from '@/product/types/productResponse.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductCategoryEntity)
    private readonly productCategoryRepository: Repository<ProductCategoryEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
  ) {}

  async findAll(
    currentUserId: number,
    query: any,
  ): Promise<ProductsResponseInterface> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.productCategory', 'productCategory');
    // .select(['products.id']);

    if (query.favorited) {
      // TODO : Check this in postman - 30 - 06:00
      const user = await this.userRepository.findOne({
        where: {
          id: currentUserId,
        },
        relations: {
          favoriteProducts: true,
        },
      });

      const ids = user.favoriteProducts.map((el) => el.id);

      if (ids.length > 0) {
        queryBuilder.andWhere('products.id IN (:...ids)', {
          ids,
        });
      } else {
        queryBuilder.andWhere('1=0');
      }
    }

    if (query.tag) {
      queryBuilder.andWhere('products.tagList LIKE :tag', {
        tag: `%${query.tag}%`,
      });
    }

    if (query.productCategoryId) {
      const productCategory = await this.productCategoryRepository.findOne({
        where: {
          id: query.productCategoryId,
        },
      });
      queryBuilder.andWhere('products.productCategoryId = :id', {
        id: productCategory.id,
      });
    }

    queryBuilder.orderBy('products.createdAt', 'DESC');

    const productsCount = await queryBuilder.getCount();

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    let favoriteIds: number[] = [];

    if (currentUserId) {
      const currentUser = await this.userRepository.findOne({
        where: {
          id: currentUserId,
        },
        relations: {
          favoriteProducts: true,
        },
      });
      favoriteIds = currentUser.favoriteProducts.map((favorite) => favorite.id);
    }

    const products = await queryBuilder.getMany();
    const productWithFavorited = products.map((product) => {
      const favorited = favoriteIds.includes(product.id);
      return { ...product, favorited };
    });

    return { products: productWithFavorited, productsCount };
  }

  async createProduct(
    currentUser: UserEntity,
    CreateProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    const product = new ProductEntity();
    Object.assign(product, CreateProductDto);
    if (!product.tagList) {
      product.tagList = [];
    }
    product.slug = this.generateSlug(CreateProductDto.title);

    const productCategory = await this.productCategoryRepository.findOne({
      where: {
        id: Number(CreateProductDto.productCategoryId),
      },
    });
    product.productCategory = productCategory;

    // product.author = currentUser;

    return await this.productRepository.save(product);
  }

  async addProductToFavoritesBySlug(
    slug: string,
    currentUserId: number,
  ): Promise<ProductEntity> {
    const product = await this.findOneBySlug(slug);
    const user = await this.userRepository.findOne({
      where: {
        id: currentUserId,
      },
      relations: {
        favoriteProducts: true,
      },
    });

    const isNotFavorited =
      user.favoriteProducts.findIndex(
        (productInFavorites) => productInFavorites.id === product.id,
      ) === -1;

    if (isNotFavorited) {
      user.favoriteProducts.push(product);
      product.favoritesCount++;
      await this.userRepository.save(user);
      await this.productRepository.save(product);
    }

    return product;
  }

  async deleteProductFromFavoritesBySlug(
    slug: string,
    currentUserId: number,
  ): Promise<ProductEntity> {
    const product = await this.findOneBySlug(slug);
    const user = await this.userRepository.findOne({
      where: {
        id: currentUserId,
      },
      relations: {
        favoriteProducts: true,
      },
    });

    const productIndex = user.favoriteProducts.findIndex(
      (productInFavorites) => productInFavorites.id === product.id,
    );

    if (productIndex >= 0) {
      user.favoriteProducts.splice(productIndex, 1);
      product.favoritesCount--;
      await this.userRepository.save(user);
      await this.productRepository.save(product);
    }

    return product;
  }

  buildProductResponse(product: ProductEntity): ProductResponseInterface {
    return { product };
  }

  private generateSlug(title: string): string {
    return (
      slugify(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }

  async findOneBySlug(slug: string): Promise<ProductEntity> {
    return await this.productRepository.findOne({
      where: {
        slug: slug,
      },
    });
  }

  async deleteProductBySlug(
    slug: string,
    currentUserId: number,
  ): Promise<DeleteResult> {
    const product = await this.findOneBySlug(slug);

    if (!product) {
      throw new HttpException('Product does not exist', HttpStatus.NOT_FOUND);
    }

    // if (product.author.id !== currentUserId) {
    //   throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    // }

    return await this.productRepository.delete({ slug });
  }

  async updateProductBySlug(
    slug: string,
    currentUserId: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    const product = await this.findOneBySlug(slug);

    if (!product) {
      throw new HttpException('Product does not exist', HttpStatus.NOT_FOUND);
    }

    // if (product.author.id !== currentUserId) {
    //   throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    // }

    Object.assign(product, updateProductDto);

    return await this.productRepository.save(product);
  }
}
