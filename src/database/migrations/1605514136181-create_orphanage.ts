 import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanage1605514136181 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'orphanages',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true, // coluna n;ao pode ser negativa
                    isPrimary: true, // indica que é a chave unica de cada usuário
                    isGenerated: true, // coluna gerada automaticamente
                    generationStrategy: 'increment' // vai ser auto increment
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'latitude',
                    type:'decimal',
                    scale: 10, // casas antes da virgula
                    precision: 2 // casas depois da virgula
                },
                {
                    name: 'longitude',
                    type:'decimal',
                    scale: 10,
                    precision: 2
                },
                {
                    name: 'about',
                    type: 'text'
                },
                {
                    name: 'instructions',
                    type: 'text'
                },
                {
                    name: 'opening_hours',
                    type: 'varchar'
                },
                {
                    name: 'open_on_weekends',
                    type: 'boolean',
                    default: false
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orphanages')
    }

}
