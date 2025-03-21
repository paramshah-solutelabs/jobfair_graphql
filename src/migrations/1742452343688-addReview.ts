import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddReview1742452343688 implements MigrationInterface {
  name = 'AddReview1742452343688';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."review_status_enum" AS ENUM('Draft', 'Submitted', 'Approved')`,
    );
    await queryRunner.query(
      `CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "review_text" character varying NOT NULL, "is_Recommended" boolean NOT NULL, "technical_score" integer NOT NULL, "communication_score" integer NOT NULL, "review_date" date NOT NULL, "status" "public"."review_status_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "interviewId" uuid, "employeeId" uuid, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_4a5f40673aa2401f08193cd14b6" FOREIGN KEY ("interviewId") REFERENCES "interview"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_2dbc3640fdc2c4be4f238aea828" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_2dbc3640fdc2c4be4f238aea828"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_4a5f40673aa2401f08193cd14b6"`,
    );
    await queryRunner.query(`DROP TABLE "review"`);
    await queryRunner.query(`DROP TYPE "public"."review_status_enum"`);
  }
}
