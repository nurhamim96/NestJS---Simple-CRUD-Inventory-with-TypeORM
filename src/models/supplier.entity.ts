import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity('supplier')
export default class SupplierEntity {

    @PrimaryColumn({type: 'varchar', length: 64, nullable: false})
    @Generated('uuid')
    id: string;

    @Column()
    supplier: string;
}