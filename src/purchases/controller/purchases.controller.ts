import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PurchasesDTO, PurchasesResponse, PurchasesResponses } from 'src/dtos/purchases.dto';
import PurchasesEntity from 'src/models/purchases.entity';
import { ResponseRebuildInterceptor } from 'src/response/response.interceptor';
import { ApiExceptionResponse } from 'src/response/response.type';
import { PurchasesService } from '../service/purchases.service';

@Controller('purchases')
export class PurchasesController {
    constructor(
        private readonly purchasesService: PurchasesService
    ) {}

    @Post()
    @ApiOperation({description: 'API create purchases'})
    @ApiBadRequestResponse({description: 'Form data validation failed.', type: ApiExceptionResponse})
    @ApiCreatedResponse({description: 'Success to create purchases', type: PurchasesResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async create(@Body() purchases: PurchasesDTO): Promise<PurchasesEntity> {
        return await this.purchasesService.create(purchases);
    }

    @Put(':id')
    @ApiOperation({description: 'API update purchases'})
    @ApiBadRequestResponse({description: 'Form data validation failed.', type: ApiExceptionResponse})
    @ApiOkResponse({description: 'Success to update purchases.', type: PurchasesResponse})
    @ApiNotFoundResponse({description: 'Not found.', type: ApiExceptionResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async update(@Param('id')id: string, @Body() purchases: PurchasesDTO): Promise<PurchasesEntity> {
        return await this.purchasesService.update(id, purchases)
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({description: 'API delete purchases'})
    @ApiNotFoundResponse({description: 'Not found.', type: ApiExceptionResponse})
    @ApiNoContentResponse({description: 'Successfully delete purchases'})
    async delete(@Param('id')id: string): Promise<any> {
        return await this.purchasesService.delete(id);
    }

    @Get()
    @ApiOperation({description: 'API list purchase'})
    @ApiOkResponse({description: 'If success get list of purchases.', type: PurchasesResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async findAll(): Promise<PurchasesResponses> {
        const data = [] = await this.purchasesService.findAll();
        return {data};
    }

    @Get('paging')
    @ApiOperation({description: 'API find with paging purchases'})
    @ApiOkResponse({description: 'If success find with paging purchases.', type: PurchasesResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async findWithPaging(
        @Query('term') term?: string,
        @Query('order') order?: 'purchaseDate',
        @Query('sort') sort: 'asc' | 'desc' = 'asc',
    ): Promise<PurchasesResponses> {
        const {result: data = []} = await this.purchasesService.findWithPaging({term, order, sort, page: 1, rowsPerPage: 5});


        return {data};
    }
}


