import { MigrationInterface, QueryRunner, QueryRunnerAlreadyReleasedError, TableColumn, TableColumnOptions, TableOptions} from "typeorm"
import { UserTama } from "../entity/UserTama"

export class migration1665477114363 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "Alter TABLE user_tama ADD COLUMN condition VARCHAR(200)"
        )
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "Alter TABLE user_tama DROP COLUMN condition CASCADE"
        )
    }

}
