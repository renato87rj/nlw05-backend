import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateConnection1619237208514 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'connections',
                columns: [
                    {
                        name: 'id', type: 'uuid', isPrimary: true
                    },
                    {
                        name: 'user_id', type: 'uuid'
                    },
                    {
                        name: 'admin_id', type: 'uuid', isNullable: true
                    },
                    {
                        name: 'socket_id', type: 'varchar'
                    },
                    {
                        name: 'created_at', type: 'timstamp', default: 'now()'
                    },
                    {
                        name: 'updated_at', type: 'timstamp', default: 'now()'
                    }
                ]
            })
        );
        await queryRunner.createForeignKey('connections', new TableForeignKey({
                name: 'connections_user_id_users', 
                referencedTableName: 'users', 
                referencedColumnNames: ['id'], 
                columnNames: ['user_id'],
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('connections', 'connections_user_id_users');
        await queryRunner.dropTable('connections');
    }

}
