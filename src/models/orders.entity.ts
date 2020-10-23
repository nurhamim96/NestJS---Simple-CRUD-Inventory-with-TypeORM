import { Column, Entity, Generated, JoinColumn, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import ProductsEntity from "./product.entity";


@Entity('orders')
export default class OrdersEntity {
    
    @PrimaryColumn({type: 'varchar', length: 64, nullable: false})
    @Generated('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    first: string;

    @Column()
    middle: string;

    @Column()
    last: string;

    @ManyToMany(() => ProductsEntity, (product: ProductsEntity) => product.id, {cascade: true})
    @JoinTable({name: 'product_orders', joinColumn:{name: 'orders_id'}, inverseJoinColumn: {name: 'products_id'}})
    productId: ProductsEntity;

    @Column()
    numberShipped: number;

    @Column()
    orderDate: Date;
}