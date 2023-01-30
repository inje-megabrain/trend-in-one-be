import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUserAuthType1675081357741 implements MigrationInterface {
  name = 'updateUserAuthType1675081357741';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."users_auth_type_enum" AS ENUM('KAKAO', 'GOOGLE')
        `);
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER',
                "auth_type" "public"."users_auth_type_enum" NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user_bookmarks" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "userId" uuid,
                "postId" uuid,
                CONSTRAINT "PK_1d1b73d6be08cec5c83521e4432" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "user_bookmarks"
            ADD CONSTRAINT "FK_4b389508f2d566939ed163a00d6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "user_bookmarks"
            ADD CONSTRAINT "FK_7ad1b47dd13eedba66aad858e7a" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_bookmarks" DROP CONSTRAINT "FK_7ad1b47dd13eedba66aad858e7a"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_bookmarks" DROP CONSTRAINT "FK_4b389508f2d566939ed163a00d6"
        `);
    await queryRunner.query(`
            DROP TABLE "user_bookmarks"
        `);
    await queryRunner.query(`
            DROP TABLE "users"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."users_auth_type_enum"
        `);
  }
}
