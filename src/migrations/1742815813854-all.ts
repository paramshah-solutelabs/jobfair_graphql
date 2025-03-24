import { MigrationInterface, QueryRunner } from "typeorm";

export class All1742815813854 implements MigrationInterface {
    name = 'All1742815813854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."review_status_enum" AS ENUM('Draft', 'Submitted', 'Approved')`);
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "review_text" character varying NOT NULL, "is_Recommended" boolean NOT NULL, "technical_score" integer NOT NULL, "communication_score" integer NOT NULL, "review_date" date NOT NULL, "status" "public"."review_status_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "interviewId" uuid, "employeeId" uuid, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."candidate_status_enum" AS ENUM('active', 'inactive', 'blocklisted')`);
        await queryRunner.query(`CREATE TABLE "candidate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "password" character varying, "phone" character varying, "resume_url" character varying, "linkedIn_url" character varying, "current_company" character varying, "current_position" character varying, "source" character varying, "rejection_date" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."candidate_status_enum" DEFAULT 'inactive', "notes" character varying, "image_url" character varying, CONSTRAINT "UQ_80e766f22573be71b86b2f05371" UNIQUE ("email"), CONSTRAINT "PK_b0ddec158a9a60fbc785281581b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "expiryDate" TIMESTAMP NOT NULL DEFAULT now(), "candidateId" uuid, "employeeId" uuid, CONSTRAINT "REL_0fffde7180d5ac814e984b67fd" UNIQUE ("candidateId"), CONSTRAINT "REL_e276451ec4fcc1f4b114395ca2" UNIQUE ("employeeId"), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."employee_type_enum" AS ENUM('Interviewer', 'HiringManager', 'Recruiter', 'Hr')`);
        await queryRunner.query(`CREATE TYPE "public"."employee_employment_status_enum" AS ENUM('Fulltime', 'Parttime', 'Invited', 'Active', 'Contract')`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "role" character varying NOT NULL, "type" "public"."employee_type_enum", "hire_date" date NOT NULL, "employment_status" "public"."employee_employment_status_enum" NOT NULL, "password" character varying, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "is_Active" boolean NOT NULL, "departmentId" uuid, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."interview_type_enum" AS ENUM('In-Person', 'Virtual', 'Phone')`);
        await queryRunner.query(`CREATE TYPE "public"."interview_status_enum" AS ENUM('Scheduled', 'Completed', 'Cancelled')`);
        await queryRunner.query(`CREATE TABLE "interview" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "scheduled_start_time" TIME NOT NULL, "scheduled_end_time" TIME NOT NULL, "type" "public"."interview_type_enum" NOT NULL, "status" "public"."interview_status_enum" NOT NULL, "round" integer NOT NULL, "meeting_link" character varying NOT NULL, "notes" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "applicationId" uuid, "employeeId" uuid, CONSTRAINT "PK_44c49a4feadefa5c6fa78bfb7d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."job_application_status_enum" AS ENUM('New', 'Screening', 'Approved', 'Reviewed', 'Interviewed', 'Offered', 'Rejected', 'Hired')`);
        await queryRunner.query(`CREATE TABLE "job_application" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "application_date" date NOT NULL DEFAULT ('now'::text)::date, "email" character varying(255) NOT NULL, "resume_url" character varying(255) NOT NULL, "cover_letter_url" character varying(255), "has_reviewed" boolean NOT NULL DEFAULT false, "expected_salary" integer, "referral_source" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "internal_notes" text, "status" "public"."job_application_status_enum" NOT NULL DEFAULT 'New', "positionId" uuid, CONSTRAINT "PK_c0b8f6b6341802967369b5d70f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "position" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "requirements" character varying NOT NULL, "position_type" character varying NOT NULL, "experience_level" character varying NOT NULL, "salary_min" integer NOT NULL, "salary_max" integer NOT NULL, "location" character varying NOT NULL, "posted_date" character varying NOT NULL, "closing_date" character varying NOT NULL, "openings" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_remote" boolean NOT NULL, "departmentId" uuid, CONSTRAINT "PK_b7f483581562b4dc62ae1a5b7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "department" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_4a5f40673aa2401f08193cd14b6" FOREIGN KEY ("interviewId") REFERENCES "interview"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_2dbc3640fdc2c4be4f238aea828" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_0fffde7180d5ac814e984b67fde" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_e276451ec4fcc1f4b114395ca25" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_9ad20e4029f9458b6eed0b0c454" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "interview" ADD CONSTRAINT "FK_35c375805d4e8809adf67f635bb" FOREIGN KEY ("applicationId") REFERENCES "job_application"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "interview" ADD CONSTRAINT "FK_3f20acd5b59aee1ae49d6c7d724" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_application" ADD CONSTRAINT "FK_7b9ee8667bf116c3124ddb8d728" FOREIGN KEY ("positionId") REFERENCES "position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "position" ADD CONSTRAINT "FK_265308a419e87c0f9eb399099da" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "position" DROP CONSTRAINT "FK_265308a419e87c0f9eb399099da"`);
        await queryRunner.query(`ALTER TABLE "job_application" DROP CONSTRAINT "FK_7b9ee8667bf116c3124ddb8d728"`);
        await queryRunner.query(`ALTER TABLE "interview" DROP CONSTRAINT "FK_3f20acd5b59aee1ae49d6c7d724"`);
        await queryRunner.query(`ALTER TABLE "interview" DROP CONSTRAINT "FK_35c375805d4e8809adf67f635bb"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_9ad20e4029f9458b6eed0b0c454"`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_e276451ec4fcc1f4b114395ca25"`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_0fffde7180d5ac814e984b67fde"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_2dbc3640fdc2c4be4f238aea828"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_4a5f40673aa2401f08193cd14b6"`);
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP TABLE "position"`);
        await queryRunner.query(`DROP TABLE "job_application"`);
        await queryRunner.query(`DROP TYPE "public"."job_application_status_enum"`);
        await queryRunner.query(`DROP TABLE "interview"`);
        await queryRunner.query(`DROP TYPE "public"."interview_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."interview_type_enum"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TYPE "public"."employee_employment_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."employee_type_enum"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TABLE "candidate"`);
        await queryRunner.query(`DROP TYPE "public"."candidate_status_enum"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TYPE "public"."review_status_enum"`);
    }

}
