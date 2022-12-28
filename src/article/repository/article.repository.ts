import dataSource from "db/data-source";
import { ArticleEntity } from "@/article/entities/article.entity";

export const ArticleRepository = dataSource.getRepository(ArticleEntity)