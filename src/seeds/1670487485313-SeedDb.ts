import { MigrationInterface, QueryRunner } from 'typeorm';

// TODO : TEST seed command
export class SeedDb1670487485313 implements MigrationInterface {
  name = 'SeedDb1670487485313';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons), ('coffee), ('nestjs)`,
    );

    await queryRunner.query(
      // password is 123
      `INSERT INTO users (username, email, password) VALUES ('admin', 'admin@admin.com', '$2b$10$mwfIFj3hE1pAVwocxEmB/OSy7FSwsAV6ul2xGhqAD1AzWtUtFknzu')`,
    );

    await queryRunner.query(
      // password is 123
      `INSERT INTO articles (slug,title,description,body,"tagList", "authorId") VALUES ('first-article-slug', 'First Article Title', 'first article description', 'first article body', 'coffee, dragons', 1),('second-article-slug', 'Second Article Title', 'second article description', 'second article body', 'coffee, dragons', 1)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
