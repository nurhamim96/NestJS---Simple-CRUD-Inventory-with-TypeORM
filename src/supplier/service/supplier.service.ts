import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierDTO, SupplierQueryDTO, SupplierQueryResult } from 'src/dtos/supplier.dto';
import SupplierEntity from 'src/models/supplier.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class SupplierService {
    constructor(
        @InjectRepository(SupplierEntity)
        private readonly supplierRepository: Repository<SupplierEntity>
    ) {}

    async create(supplier: SupplierDTO): Promise<SupplierEntity> {
        return await this.supplierRepository.save(supplier);
    }

    async update(id: string, supplierDTO: SupplierDTO): Promise<SupplierEntity> {
        let supplier: SupplierEntity = await this.supplierRepository.findOne(id);

        if(!supplier) throw new BadRequestException(`Supplier with id ${id} not found`);
        else {
            supplier = this.supplierRepository.merge(supplier, supplierDTO);
            return await this.supplierRepository.save(supplier);
        }
    }

    async delete(id: string): Promise<any> {
        return await this.supplierRepository.delete({id});
    }

    async findAll(): Promise<SupplierEntity[]> {
        return await this.supplierRepository.find();
    }

    async findWithPaging(queryParams: SupplierQueryDTO): Promise<SupplierQueryResult> {
        const offset: number = queryParams.page > 1 ? (queryParams.rowsPerPage * (queryParams.page - 1)) : 0;
        let query: SelectQueryBuilder<SupplierEntity> = this.supplierRepository.createQueryBuilder('supplierAlias');

        if(queryParams.term) {
            let {term} = queryParams;
            term = `%${term}%`;
            query = query
                .andWhere('supplierAlias.supplier LIKE : term', {term});
        }

        if(queryParams.order && queryParams.sort) {
            const sort: 'ASC' | 'DESC' = queryParams.sort.toUpperCase() as 'ASC' | 'DESC';
            const supplierCols: { [key: string]: string } = {
                name: 'supplierAlias.supplier',
            };
            query = query.orderBy(supplierCols[queryParams.order], sort);
        } else {
            query = query.orderBy('supplierAlias.supplier', 'ASC');
        }

        query.offset(offset);
        query.limit(queryParams.rowsPerPage);

        const result: [SupplierEntity[], number] = await query.getManyAndCount();

        return {
            result: result[0],
            totalRows: result[1],
        }
    }
}
