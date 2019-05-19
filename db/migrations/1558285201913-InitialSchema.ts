import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1558285201913 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "follows" ("id" SERIAL NOT NULL, "follower_id" character varying NOT NULL, "following_id" character varying NOT NULL, CONSTRAINT "PK_8988f607744e16ff79da3b8a627" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "follows"`);
    }

}
