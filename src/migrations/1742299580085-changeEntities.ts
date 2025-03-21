import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeEntities1742299580085 implements MigrationInterface {
  name = 'ChangeEntities1742299580085';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "position" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "requirements" character varying NOT NULL, "position_type" character varying NOT NULL, "experience_level" character varying NOT NULL, "salary_min" integer NOT NULL, "salary_max" integer NOT NULL, "location" character varying NOT NULL, "posted_date" date NOT NULL, "closing_date" date NOT NULL, "openings" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_remote" boolean NOT NULL, "departmentId" uuid, CONSTRAINT "PK_b7f483581562b4dc62ae1a5b7e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "position" ADD CONSTRAINT "FK_265308a419e87c0f9eb399099da" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "position" DROP CONSTRAINT "FK_265308a419e87c0f9eb399099da"`,
    );
    await queryRunner.query(`DROP TABLE "position"`);
  }
}
