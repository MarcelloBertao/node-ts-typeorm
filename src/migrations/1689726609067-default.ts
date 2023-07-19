import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1689726609067 implements MigrationInterface {
    name = 'Default1689726609067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lendings" DROP CONSTRAINT "FK_049fdf64f3a6dd92a9654b06006"`);
        await queryRunner.query(`ALTER TABLE "lendings" DROP CONSTRAINT "FK_6fea5216a40b46745d3e956687d"`);
        await queryRunner.query(`ALTER TABLE "lendings" DROP COLUMN "student_ra"`);
        await queryRunner.query(`ALTER TABLE "lendings" DROP COLUMN "collaborator_cpf"`);
        await queryRunner.query(`ALTER TABLE "lendings" ADD "student_id" integer`);
        await queryRunner.query(`ALTER TABLE "lendings" ADD "collaborator_id" integer`);
        await queryRunner.query(`ALTER TABLE "books" ADD "nome" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lendings" ADD CONSTRAINT "FK_2c9b159eb87760aaff72bda8971" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lendings" ADD CONSTRAINT "FK_763ae0bb6ed9ec7d2201923846f" FOREIGN KEY ("collaborator_id") REFERENCES "collaborators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lendings" DROP CONSTRAINT "FK_763ae0bb6ed9ec7d2201923846f"`);
        await queryRunner.query(`ALTER TABLE "lendings" DROP CONSTRAINT "FK_2c9b159eb87760aaff72bda8971"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "lendings" DROP COLUMN "collaborator_id"`);
        await queryRunner.query(`ALTER TABLE "lendings" DROP COLUMN "student_id"`);
        await queryRunner.query(`ALTER TABLE "lendings" ADD "collaborator_cpf" integer`);
        await queryRunner.query(`ALTER TABLE "lendings" ADD "student_ra" integer`);
        await queryRunner.query(`ALTER TABLE "lendings" ADD CONSTRAINT "FK_6fea5216a40b46745d3e956687d" FOREIGN KEY ("collaborator_cpf") REFERENCES "collaborators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lendings" ADD CONSTRAINT "FK_049fdf64f3a6dd92a9654b06006" FOREIGN KEY ("student_ra") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
