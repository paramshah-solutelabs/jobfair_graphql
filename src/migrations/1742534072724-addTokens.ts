import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTokens1742534072724 implements MigrationInterface {
  name = 'AddTokens1742534072724';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "expiryDate" TIMESTAMP NOT NULL DEFAULT now(), "candidateId" uuid, "employeeId" uuid, CONSTRAINT "REL_0fffde7180d5ac814e984b67fd" UNIQUE ("candidateId"), CONSTRAINT "REL_e276451ec4fcc1f4b114395ca2" UNIQUE ("employeeId"), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD CONSTRAINT "FK_0fffde7180d5ac814e984b67fde" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD CONSTRAINT "FK_e276451ec4fcc1f4b114395ca25" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tokens" DROP CONSTRAINT "FK_e276451ec4fcc1f4b114395ca25"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" DROP CONSTRAINT "FK_0fffde7180d5ac814e984b67fde"`,
    );
    await queryRunner.query(`DROP TABLE "tokens"`);
  }
}
