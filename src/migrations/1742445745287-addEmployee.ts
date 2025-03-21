import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmployee1742445745287 implements MigrationInterface {
  name = 'AddEmployee1742445745287';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."employee_type_enum" AS ENUM('Interviewer', 'HiringManager', 'Recruiter', 'Hr')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."employee_employment_status_enum" AS ENUM('Fulltime', 'Parttime', 'Invited', 'Active', 'Contract')`,
    );
    await queryRunner.query(
      `CREATE TABLE "employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "role" character varying NOT NULL, "type" "public"."employee_type_enum", "hire_date" date NOT NULL, "employment_status" "public"."employee_employment_status_enum" NOT NULL, "password" character varying, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "is_Active" boolean NOT NULL, "departmentId" uuid, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ADD CONSTRAINT "FK_9ad20e4029f9458b6eed0b0c454" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee" DROP CONSTRAINT "FK_9ad20e4029f9458b6eed0b0c454"`,
    );
    await queryRunner.query(`DROP TABLE "employee"`);
    await queryRunner.query(
      `DROP TYPE "public"."employee_employment_status_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."employee_type_enum"`);
  }
}
