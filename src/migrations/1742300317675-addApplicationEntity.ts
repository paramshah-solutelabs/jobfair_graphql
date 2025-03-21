import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddApplicationEntity1742300317675 implements MigrationInterface {
  name = 'AddApplicationEntity1742300317675';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "job_application" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "application_date" date NOT NULL DEFAULT ('now'::text)::date, "email" character varying(255) NOT NULL, "resume_url" character varying(255) NOT NULL, "cover_letter_url" character varying(255), "has_reviewed" boolean NOT NULL DEFAULT false, "expected_salary" integer, "referral_source" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "internal_notes" text, "positionId" uuid, CONSTRAINT "PK_c0b8f6b6341802967369b5d70f5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_application" ADD CONSTRAINT "FK_7b9ee8667bf116c3124ddb8d728" FOREIGN KEY ("positionId") REFERENCES "position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job_application" DROP CONSTRAINT "FK_7b9ee8667bf116c3124ddb8d728"`,
    );
    await queryRunner.query(`DROP TABLE "job_application"`);
  }
}
