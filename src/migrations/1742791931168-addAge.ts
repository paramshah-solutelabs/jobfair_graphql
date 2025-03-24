import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAge1742791931168 implements MigrationInterface {
    name = 'AddAge1742791931168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_application" ADD "candidateId" uuid`);
        await queryRunner.query(`ALTER TABLE "job_application" ADD CONSTRAINT "FK_8878445850d7718f130a19991d1" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_application" DROP CONSTRAINT "FK_8878445850d7718f130a19991d1"`);
        await queryRunner.query(`ALTER TABLE "job_application" DROP COLUMN "candidateId"`);
    }

}
