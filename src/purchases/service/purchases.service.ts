import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchasesDTO, PurchasesQueryDTO, PurchasesQueryResult } from 'src/dtos/purchases.dto';
import PurchasesEntity from 'src/models/purchases.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class PurchasesService {
    constructor(
        @InjectRepository(PurchasesEntity)
        private readonly purchasesRepository: Repository<PurchasesEntity> 
    ) {}

    async create(purchases: PurchasesDTO): Promise<PurchasesEntity> {
        return await this.purchasesRepository.save(purchases);
    }

    async update(id: string, purchasesDTO: PurchasesDTO): Promise<PurchasesEntity> {
        let purchases: PurchasesEntity = await this.purchasesRepository.findOne(id);


        if(!purchases) throw new BadRequestException(`Purchases with id: ${id} not found`);
        else {
            purchases = this.purchasesRepository.merge(purchases, purchasesDTO);
            return await this.purchasesRepository.save(purchases);
        }
    }

    async delete(id: string): Promise<any> {
        return await this.purchasesRepository.delete({id});
    }

    async findAll(): Promise<PurchasesEntity[]> {
        return await this.purchasesRepository.find({relations: ['productId', 'supplierId']});
    }

    async findWithPaging(queryParams: PurchasesQueryDTO): Promise<PurchasesQueryResult> {
        const offset: number = queryParams.page > 1 ? (queryParams.rowsPerPage * (queryParams.page - 1)) : 0;
        let query: SelectQueryBuilder<PurchasesEntity> = this.purchasesRepository.createQueryBuilder('purchasesAlias').innerJoinAndSelect('purchasesAlias.productId', 'product');

        if(queryParams.term) {
            let {term} = queryParams;
            term = `%${term}%`;
            query = query
                .andWhere('purchasesAlias.purchaseDate LIKE : term', {term});
        }

        if(queryParams.order && queryParams.sort) {
            const sort: 'ASC' | 'DESC' = queryParams.sort.toUpperCase() as 'ASC' | 'DESC';
            const purchasesCols: { [key: string]: string} = {
                name: 'purchasesAlias.purchaseDate',
            };
            query = query.orderBy(purchasesCols[queryParams.order], sort);
        } else {
            query = query.orderBy('purchasesAlias.purchaseDate', 'ASC');
        }

        query.offset(offset);
        query.limit(queryParams.rowsPerPage);

        const result: [PurchasesEntity[], number] = await query.getManyAndCount();

        return {
            result: result[0],
            totalRows: result[1],
        }
    }
}
