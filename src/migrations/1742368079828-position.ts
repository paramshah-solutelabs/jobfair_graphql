import { MigrationInterface, QueryRunner } from 'typeorm';

export class Position1742368079828 implements MigrationInterface {
  name = 'Position1742368079828';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "position" DROP COLUMN "posted_date"`);
    await queryRunner.query(
      `ALTER TABLE "position" ADD "posted_date" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "position" DROP COLUMN "closing_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "position" ADD "closing_date" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "position" DROP COLUMN "closing_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "position" ADD "closing_date" date NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "position" DROP COLUMN "posted_date"`);
    await queryRunner.query(
      `ALTER TABLE "position" ADD "posted_date" date NOT NULL`,
    );
  }
}
