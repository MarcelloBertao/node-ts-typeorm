import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687898459463 implements MigrationInterface {
    name = 'Default1687898459463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "students" ("ra" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "fone" text NOT NULL, CONSTRAINT "PK_78733e67417af01f61ffdf7c1ee" PRIMARY KEY ("ra"))`);
        await queryRunner.query(`CREATE TABLE "lendings" ("id" SERIAL NOT NULL, "dateEvent" text NOT NULL, "dateReturn" text NOT NULL, "student_ra" integer, "collaborator_cpf" integer, CONSTRAINT "PK_ac99692b2e8df0cac064dd09585" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collaborators" ("cpf" SERIAL NOT NULL, "nome" text NOT NULL, "email" text NOT NULL, CONSTRAINT "PK_fa7ec23129d7651aed5b6ce06ee" PRIMARY KEY ("cpf"))`);
        await queryRunner.query(`ALTER TABLE "lendings" ADD CONSTRAINT "FK_049fdf64f3a6dd92a9654b06006" FOREIGN KEY ("student_ra") REFERENCES "students"("ra") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lendings" ADD CONSTRAINT "FK_6fea5216a40b46745d3e956687d" FOREIGN KEY ("collaborator_cpf") REFERENCES "collaborators"("cpf") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lendings" DROP CONSTRAINT "FK_6fea5216a40b46745d3e956687d"`);
        await queryRunner.query(`ALTER TABLE "lendings" DROP CONSTRAINT "FK_049fdf64f3a6dd92a9654b06006"`);
        await queryRunner.query(`DROP TABLE "collaborators"`);
        await queryRunner.query(`DROP TABLE "lendings"`);
        await queryRunner.query(`DROP TABLE "students"`);
    }

}
