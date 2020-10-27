import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import ProductsEntity from "./product.entity";
import SupplierEntity from "./supplier.entity";


@Entity('purchases')
export default class PurchasesEntity {

    @PrimaryColumn({type: 'varchar', length: 64, nullable: false})
    @Generated('uuid')
    id: string;

    @Column()
    @ManyToOne(() => SupplierEntity, (supplier: SupplierEntity) => supplier.id, {cascade: true})
    @JoinColumn({name: 'supplierId'})
    supplierId: SupplierEntity;

    @Column()
    @ManyToOne(() => ProductsEntity, (product: ProductsEntity) => product.id, {cascade: true})
    @JoinColumn({name: 'productId'})
    productId: ProductsEntity;

    @Column()
    numberReceived: number;

    @Column()
    purchaseDate: Date;
}