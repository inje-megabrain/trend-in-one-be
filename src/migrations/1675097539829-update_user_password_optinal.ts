import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUserPasswordOptinal1675097539829
  implements MigrationInterface
{
  name = 'updateUserPasswordOptinal1675097539829';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "password" DROP NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "password"
            SET NOT NULL
        `);
  }
}
