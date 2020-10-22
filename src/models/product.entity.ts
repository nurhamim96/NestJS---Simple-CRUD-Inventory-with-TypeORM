import { Column, Entity, Generated, PrimaryColumn } from "typeorm";


@Entity('products')
export default class ProductsEntity {
    
    @PrimaryColumn({ type: 'varchar', length: 64, nullable: false })
    @Generated('uuid')
    id: string;

    @Column()
    productName: string;

    @Column()
    partNumber: string;

    @Column()
    productLabel: string;

    @Column()
    startingInventory: number;

    @Column()
    inventoryReceive: number;

    @Column()
    inventoryShipped: number;

    @Column()
    inventoryOnHand: number;

    @Column()
    minimumRequired: number;
}