import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ProductsDTO, ProductsResponse, ProductsResponses } from 'src/dtos/products.dto';
import ProductsEntity from 'src/models/product.entity';
import { ResponseRebuildInterceptor } from 'src/response/response.interceptor';
import { ApiExceptionResponse } from 'src/response/response.type';
import { ProductsService } from '../service/products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ){}

    @Post()
    @ApiOperation({description: 'API create products'})
    @ApiBadRequestResponse({description: 'Form data validation failed.', type: ApiExceptionResponse})
    @ApiCreatedResponse({description: 'Success to create products', type: ProductsResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async create(@Body() products: ProductsDTO): Promise<ProductsEntity> {
        return await this.productsService.create(products);
    }

    @Put(':id')
    @ApiOperation({description: 'API update products'})
    @ApiBadRequestResponse({description: 'Form data validation failed.', type: ApiExceptionResponse})
    @ApiOkResponse({description: 'Success to update products', type: ProductsResponse})
    @ApiNotFoundResponse({description: 'Not found.', type: ApiExceptionResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async update(@Param('id')id: string, @Body() products: ProductsDTO): Promise<ProductsEntity> {
        return await this.productsService.update(id, products);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({description: 'API delete products.'})
    @ApiNotFoundResponse({description: 'Not found.', type: ApiExceptionResponse})
    @ApiNoContentResponse({description: 'Successfully delete products.'})
    async delete(@Param('id')id: string): Promise<any> {
        return this.productsService.delete(id);
    }

    @Get()
    @ApiOperation({description: 'API List Products'})
    @ApiOkResponse({description: 'If success get list of products.', type: ProductsResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async findAll(): Promise<ProductsResponses> {
        const data = [] = await this.productsService.findAll();
        return {data};
    }

    @Get('paging')
    @ApiOperation({description: 'API find with paging products'})
    @ApiOkResponse({description: 'If success find with paging products.', type: ProductsResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async findWithPaging(
        @Query('term') term?: string,
        @Query('order') order?: 'productName',
        @Query('sort') sort: 'asc' | 'desc' = 'asc',
    ): Promise<ProductsResponses> {
        const { result: data = [] } = await this.productsService.findWithPaging({term, order, sort, page: 1, rowsPerPage: 5});

        return {data};
    }
}
