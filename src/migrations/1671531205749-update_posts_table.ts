import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatePostsTable1671531205749 implements MigrationInterface {
  name = 'updatePostsTable1671531205749';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "title"
        `);
    await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "title" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "author"
        `);
    await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "author" character varying NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "author"
        `);
    await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "author" character varying(100) NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "title"
        `);
    await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "title" character varying(100) NOT NULL
        `);
  }
}
