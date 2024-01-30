import { MigrationInterface, QueryRunner } from 'typeorm';

export class TaskTable1706392503955 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(
      `CREATE TABLE task (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            title varchar(256) NOT NULL,
            description varchar(512) NULL,
            status varchar(50) NOT NULL DEFAULT 'TO_DO',
            expiration_date timestamptz NOT NULL,
            CONSTRAINT task_pk PRIMARY KEY (id)
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS task;`);
  }
}
