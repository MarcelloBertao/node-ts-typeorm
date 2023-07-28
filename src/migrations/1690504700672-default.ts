import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1690504700672 implements MigrationInterface {
    name = 'Default1690504700672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "students" ("id" SERIAL NOT NULL, "ra" text NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "fone" text NOT NULL, CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collaborators" ("id" SERIAL NOT NULL, "cpf" text NOT NULL, "nome" text NOT NULL, "email" text NOT NULL, CONSTRAINT "PK_f579a5df9d66287f400806ad875" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "isbn" text NOT NULL, "nome" text NOT NULL, "autor" text NOT NULL, "paginas" integer NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lendings" ("id" SERIAL NOT NULL, "dateEvent" text NOT NULL, "dateReturn" text NOT NULL, "student_id" integer, "collaborator_id" integer, CONSTRAINT "PK_ac99692b2e8df0cac064dd09585" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_lending" ("book_id" integer NOT NULL, "lending_id" integer NOT NULL, CONSTRAINT "PK_b4f68e8013fe52237bc60dffd55" PRIMARY KEY ("book_id", "lending_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4fae0f0a8af88d1331969e84bd" ON "book_lending" ("book_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_eef94938805f5ce7dcb238a20d" ON "book_lending" ("lending_id") `);
        await queryRunner.query(`ALTER TABLE "lendings" ADD CONSTRAINT "FK_2c9b159eb87760aaff72bda8971" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lendings" ADD CONSTRAINT "FK_763ae0bb6ed9ec7d2201923846f" FOREIGN KEY ("collaborator_id") REFERENCES "collaborators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_lending" ADD CONSTRAINT "FK_4fae0f0a8af88d1331969e84bd5" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_lending" ADD CONSTRAINT "FK_eef94938805f5ce7dcb238a20df" FOREIGN KEY ("lending_id") REFERENCES "lendings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_lending" DROP CONSTRAINT "FK_eef94938805f5ce7dcb238a20df"`);
        await queryRunner.query(`ALTER TABLE "book_lending" DROP CONSTRAINT "FK_4fae0f0a8af88d1331969e84bd5"`);
        await queryRunner.query(`ALTER TABLE "lendings" DROP CONSTRAINT "FK_763ae0bb6ed9ec7d2201923846f"`);
        await queryRunner.query(`ALTER TABLE "lendings" DROP CONSTRAINT "FK_2c9b159eb87760aaff72bda8971"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eef94938805f5ce7dcb238a20d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4fae0f0a8af88d1331969e84bd"`);
        await queryRunner.query(`DROP TABLE "book_lending"`);
        await queryRunner.query(`DROP TABLE "lendings"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "collaborators"`);
        await queryRunner.query(`DROP TABLE "students"`);
    }

}
