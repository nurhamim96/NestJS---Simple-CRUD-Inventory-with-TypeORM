import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SupplierDTO, SupplierResponse, SupplierResponses } from 'src/dtos/supplier.dto';
import SupplierEntity from 'src/models/supplier.entity';
import { ResponseRebuildInterceptor } from 'src/response/response.interceptor';
import { ApiExceptionResponse } from 'src/response/response.type';
import { SupplierService } from '../service/supplier.service';

@Controller('supplier')
export class SupplierController {
    constructor(
        private readonly supplierService: SupplierService
    ) {}

    @Post()
    @ApiOperation({description: 'API create supplier'})
    @ApiBadRequestResponse({description: 'Form data validation failed.', type: ApiExceptionResponse})
    @ApiCreatedResponse({description: 'Success to create supplier.', type: SupplierResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async create(@Body() supplier: SupplierDTO): Promise<SupplierEntity> {
        return await this.supplierService.create(supplier);
    }

    @Put(':id')
    @ApiOperation({description: 'API update supplier'})
    @ApiBadRequestResponse({description: 'Form data validation failed.', type: ApiExceptionResponse})
    @ApiOkResponse({description: 'Success to update supplier.', type: SupplierResponse})
    @ApiNotFoundResponse({description: 'Not found', type: ApiExceptionResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async update(@Param('id')id: string, @Body() supplier: SupplierDTO): Promise<SupplierEntity> {
        return await this.update(id, supplier);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({description: 'API delete supplier'})
    @ApiNotFoundResponse({description: 'Not found.', type: ApiExceptionResponse})
    @ApiNoContentResponse({description: 'Successfully delete supplier.'})
    async delete(@Param('id')id: string): Promise<any> {
        return await this.supplierService.delete(id);
    }

    @Get()
    @ApiOperation({description: 'API list supplier'})
    @ApiOkResponse({description: 'If success get list of supplier.', type: SupplierResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async findAll(): Promise<SupplierResponses> {
        const data = [] = await this.supplierService.findAll();
        return {data};
    }

    async findWithPaging(
        @Query('term') term?: string,
        @Query('order') order?: 'supplier',
        @Query('sort') sort: 'asc' | 'desc' = 'asc',
    ): Promise<SupplierResponses> {
        const {result: data = []} = await this.supplierService.findWithPaging({term, order, sort, page: 1, rowsPerPage: 5});

        return {data}
    }
}
