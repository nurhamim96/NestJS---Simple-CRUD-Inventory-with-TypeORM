import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsDTO, ProductsQueryDTO, ProductsQueryResult } from 'src/dtos/products.dto';
import ProductsEntity from 'src/models/product.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductsEntity) private readonly productRepository: Repository<ProductsEntity>
    ) {}

    async create(products: ProductsDTO): Promise<ProductsEntity> {
        return this.productRepository.save(products);
    }

    async update(id: string, productsDTO: ProductsDTO): Promise<ProductsEntity> {
       let products: ProductsEntity = await this.productRepository.findOne(id);
       
       if (!products) throw new BadRequestException(`Products with id: ${id} not found`);
       else {
           products = this.productRepository.merge(products, productsDTO);
           return await this.productRepository.save(products);
       }
    }

    async delete(id: string): Promise<any> {
        return await this.productRepository.delete({id});
    }

    async findAll(): Promise<ProductsEntity[]> {
        return await this.productRepository.find();
    }

    async findWithPaging(queryParams: ProductsQueryDTO): Promise<ProductsQueryResult> {
        const offset: number = queryParams.page > 1 ? (queryParams.rowsPerPage * (queryParams.page - 1)) : 0;
        let query: SelectQueryBuilder<ProductsEntity> = this.productRepository.createQueryBuilder('productsAlias');

        if (queryParams.term) {
            let { term } = queryParams;
            term = `%${term}%`;
            query = query
                .andWhere('productsAlias.productName LIKE : term', {term});
        }

        if(queryParams.order && queryParams.sort) {
            const sort: 'ASC' | 'DESC' = queryParams.sort.toUpperCase() as 'ASC' | 'DESC';
            const orderCols: { [key: string]: string } = {
                name: 'productsAlias.productName',
            };
            query = query.orderBy(orderCols[queryParams.order], sort);
        } else {
            query = query.orderBy('productsAlias.productName', 'ASC');
        }

        query.offset(offset);
        query.limit(queryParams.rowsPerPage);

        const result: [ProductsEntity[], number] = await query.getManyAndCount();

        return {
            result: result[0],
            totalRows: result[1],
        }
    }
}
