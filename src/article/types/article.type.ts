import { ArticleEntity } from '@/article/entities/article.entity';

export type ArticleType = Omit<ArticleEntity, 'updateTimestamp'>;
