import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1767778182561 implements MigrationInterface {
    name = ' $npmConfigName1767778182561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "createdAt"`);
    }

}
