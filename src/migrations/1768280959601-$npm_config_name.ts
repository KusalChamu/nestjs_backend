import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1768280959601 implements MigrationInterface {
    name = ' $npmConfigName1768280959601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // If column doesn't exist (older state), add it first as nullable so we can safely make it NOT NULL
        const colRes = await queryRunner.query(`SELECT column_name FROM information_schema.columns WHERE table_name='articles' AND lower(column_name)=lower('authorId')`);
        if (colRes.length === 0) {
            await queryRunner.query(`ALTER TABLE "articles" ADD "authorId" integer`);
        }

        // Prevent failing when there are existing NULL values: surface a clear error so user can fix data first
        const nullCountRes = await queryRunner.query(`SELECT COUNT(*) as cnt FROM "articles" WHERE "authorId" IS NULL`);
        const nullCount = parseInt(nullCountRes[0].cnt, 10);
        if (nullCount > 0) {
            throw new Error(`Cannot set "authorId" NOT NULL: ${nullCount} rows have NULL "authorId". Please update those rows before running this migration.`);
        }

        // Make column NOT NULL (do not re-add FK which already exists)
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "authorId" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert to nullable
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "authorId" DROP NOT NULL`);
    }

}
