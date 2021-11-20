import { MigrationInterface, QueryRunner } from "typeorm";

export class addRelation1637434879611 implements MigrationInterface {
  name = "addRelation1637434879611";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`vehicles\` ADD \`user_id\` varchar(36) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`vehicles\` ADD CONSTRAINT \`FK_88b36924d769e4df751bcfbf249\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`vehicles\` DROP FOREIGN KEY \`FK_88b36924d769e4df751bcfbf249\``
    );

    await queryRunner.query(`ALTER TABLE \`vehicles\` DROP COLUMN \`user_id\``);
  }
}
