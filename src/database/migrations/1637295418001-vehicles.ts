import { MigrationInterface, QueryRunner } from "typeorm";

export class vehicles1637295418001 implements MigrationInterface {
  name = "vehicles1637295418001";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`vehicles\` (\`id\` varchar(36) NOT NULL, \`plate\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`color\` varchar(255), \`model\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_ec7181ebdab798d97070122a5b\` (\`plate\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_ec7181ebdab798d97070122a5b\` ON \`vehicles\``
    );
    await queryRunner.query(`DROP TABLE \`vehicles\``);
  }
}
