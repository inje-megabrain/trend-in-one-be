import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTopicTable1672563869478 implements MigrationInterface {
  name = 'createTopicTable1672563869478';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "topics" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "url" character varying NOT NULL,
                "promoted_content" character varying,
                "query" character varying NOT NULL,
                "tweet_volume" integer,
                "woeid" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "community_id" uuid,
                CONSTRAINT "UQ_1304b1c61016e63f60cd147ce6b" UNIQUE ("name"),
                CONSTRAINT "PK_e4aa99a3fa60ec3a37d1fc4e853" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "topics"
            ADD CONSTRAINT "FK_0b27a011dc242f52675dc080a01" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "topics" DROP CONSTRAINT "FK_0b27a011dc242f52675dc080a01"
        `);
    await queryRunner.query(`
            DROP TABLE "topics"
        `);
  }
}
