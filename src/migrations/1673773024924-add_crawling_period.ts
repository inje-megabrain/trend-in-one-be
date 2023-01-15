import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCrawlingPeriod1673773024924 implements MigrationInterface {
  name = 'addCrawlingPeriod1673773024924';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD "period" integer NOT NULL DEFAULT '5'
        `);
    await queryRunner.query(`
            ALTER TABLE "posts"
            ADD CONSTRAINT "UQ_a0828eb097873f0288a434ec0cb" UNIQUE ("post_url")
        `);
    await queryRunner.query(`
            ALTER TABLE "tasks"
            ALTER COLUMN "description" DROP NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "tasks"
            ALTER COLUMN "description"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "posts" DROP CONSTRAINT "UQ_a0828eb097873f0288a434ec0cb"
        `);
    await queryRunner.query(`
            ALTER TABLE "tasks" DROP COLUMN "period"
        `);
  }
}
