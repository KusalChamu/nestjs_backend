import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1768367377231 implements MigrationInterface {
    name = ' $npmConfigName1768367377231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "description" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "description" DROP DEFAULT`);
    }

}
