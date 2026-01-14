import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1768367464775 implements MigrationInterface {
    name = ' $npmConfigName1768367464775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "body" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "body" DROP DEFAULT`);
    }

}
