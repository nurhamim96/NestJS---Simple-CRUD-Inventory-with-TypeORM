import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersDTO, OrdersQueryDTO, OrdersQUeryResult } from 'src/dtos/orders.dto';
import OrdersEntity from 'src/models/orders.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrdersEntity)
        private readonly ordersRespository: Repository<OrdersEntity>
    ) {}

    async create(orders: OrdersDTO): Promise<OrdersEntity> {
        return this.ordersRespository.save(orders);
    }

    async update(id: string, ordersDTO: OrdersDTO): Promise<OrdersEntity> {
        let orders: OrdersEntity = await this.ordersRespository.findOne(id);


        if(!orders) throw new BadRequestException(`Orders with id: ${id} not found.`);
        else {
            orders = this.ordersRespository.merge(orders, ordersDTO);
            return await this.ordersRespository.save(orders);
        }
    }

    async delete(id: string): Promise<any> {
        return await this.ordersRespository.delete({id});
    }

    async findAll(): Promise<OrdersEntity[]> {
        return await this.ordersRespository.find({relations: ['productId']});
    }

    async findWithPaging(queryParams: OrdersQueryDTO): Promise<OrdersQUeryResult> {
        const offset: number = queryParams.page > 1 ? (queryParams.rowsPerPage * (queryParams.page - 1)) : 0;
        let query: SelectQueryBuilder<OrdersEntity> = this.ordersRespository.createQueryBuilder('ordersAlias').innerJoinAndSelect('ordersAlias.productId', 'product');

        if(queryParams.term) {
            let {term} = queryParams;
            term =`%${term}%`;
            query = query
                .andWhere('ordersAlias.orderDate LIKE : term', {term});
        }

        if(queryParams.order && queryParams.sort) {
            const sort: 'ASC' | 'DESC' = queryParams.sort.toUpperCase() as 'ASC' | 'DESC';
            const orderCols: { [key: string]: string} = {
                name: 'ordersAlias.orderDate',
            };
                query = query.orderBy(orderCols[queryParams.order], sort);
                
        } else {
            query = query.orderBy('ordersAlias.orderDate', 'ASC');
        }

        query.offset(offset);
        query.limit(queryParams.rowsPerPage);

        const result: [OrdersEntity[], number] = await query.getManyAndCount();

        return {
            result: result[0],
            totalRows: result[1],
        }

    }
}
