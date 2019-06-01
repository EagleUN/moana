import {MigrationInterface, QueryRunner} from "typeorm";

export class ColumnFixes1558908369308 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "follows" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "follower_id" uuid NOT NULL, "following_id" uuid NOT NULL, CONSTRAINT "PK_8988f607744e16ff79da3b8a627" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL, "idCreator" uuid NOT NULL, "content" character varying NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "share" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "postId" uuid NOT NULL, CONSTRAINT "PK_67a2b28d2cff31834bc2aa1ed7c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "share"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "follows"`);
    }

}
