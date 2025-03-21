import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInterview1742450377489 implements MigrationInterface {
  name = 'AddInterview1742450377489';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."interview_type_enum" AS ENUM('In-Person', 'Virtual', 'Phone')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."interview_status_enum" AS ENUM('Scheduled', 'Completed', 'Cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "interview" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "scheduled_start_time" TIME NOT NULL, "scheduled_end_time" TIME NOT NULL, "type" "public"."interview_type_enum" NOT NULL, "status" "public"."interview_status_enum" NOT NULL, "round" integer NOT NULL, "meeting_link" character varying NOT NULL, "notes" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "applicationId" uuid, "employeeId" uuid, CONSTRAINT "PK_44c49a4feadefa5c6fa78bfb7d1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "interview" ADD CONSTRAINT "FK_35c375805d4e8809adf67f635bb" FOREIGN KEY ("applicationId") REFERENCES "job_application"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "interview" ADD CONSTRAINT "FK_3f20acd5b59aee1ae49d6c7d724" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "interview" DROP CONSTRAINT "FK_3f20acd5b59aee1ae49d6c7d724"`,
    );
    await queryRunner.query(
      `ALTER TABLE "interview" DROP CONSTRAINT "FK_35c375805d4e8809adf67f635bb"`,
    );
    await queryRunner.query(`DROP TABLE "interview"`);
    await queryRunner.query(`DROP TYPE "public"."interview_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."interview_type_enum"`);
  }
}
