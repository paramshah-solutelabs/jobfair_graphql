import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStatus1742374734649 implements MigrationInterface {
  name = 'AddStatus1742374734649';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."job_application_status_enum" AS ENUM('New', 'Screening', 'Approved', 'Reviewed', 'Interviewed', 'Offered', 'Rejected', 'Hired')`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_application" ADD "status" "public"."job_application_status_enum" NOT NULL DEFAULT 'New'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job_application" DROP COLUMN "status"`,
    );
    await queryRunner.query(`DROP TYPE "public"."job_application_status_enum"`);
  }
}
