import { MigrationInterface, QueryRunner } from 'typeorm';

export class createPostTable1671258633598 implements MigrationInterface {
  name = 'createPostTable1671258633598';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."communities_title_enum" AS ENUM('Reddit')
        `);
    await queryRunner.query(`
            CREATE TABLE "communities" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" "public"."communities_title_enum" NOT NULL,
                CONSTRAINT "PK_fea1fe83c86ccde9d0a089e7ea2" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "posts" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying(100) NOT NULL,
                "author" character varying(100) NOT NULL,
                "views" integer,
                "likes" integer,
                "has_image" boolean NOT NULL,
                "post_url" character varying NOT NULL,
                "uploaded_at" date NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "community_id" uuid,
                CONSTRAINT "REL_63078ada3266846e539d930b1b" UNIQUE ("community_id"),
                CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "posts"
            ADD CONSTRAINT "FK_63078ada3266846e539d930b1be" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "posts" DROP CONSTRAINT "FK_63078ada3266846e539d930b1be"
        `);
    await queryRunner.query(`
            DROP TABLE "posts"
        `);
    await queryRunner.query(`
            DROP TABLE "communities"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."communities_title_enum"
        `);
  }
}
