import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAge1742379245149 implements MigrationInterface {
  name = 'AddAge1742379245149';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."candidate_status_enum" AS ENUM('active', 'inactive', 'blocklisted')`,
    );
    await queryRunner.query(
      `CREATE TABLE "candidate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "password" character varying, "phone" character varying, "resume_url" character varying, "linkedIn_url" character varying, "current_company" character varying, "current_position" character varying, "source" character varying, "rejection_date" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."candidate_status_enum" DEFAULT 'inactive', "notes" character varying, "image_url" character varying, CONSTRAINT "UQ_80e766f22573be71b86b2f05371" UNIQUE ("email"), CONSTRAINT "PK_b0ddec158a9a60fbc785281581b" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "candidate"`);
    await queryRunner.query(`DROP TYPE "public"."candidate_status_enum"`);
  }
}
