import { Body, Controller, Delete, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { OrdersDTO, OrdersResponse, OrdersResponses } from 'src/dtos/orders.dto';
import OrdersEntity from 'src/models/orders.entity';
import { ResponseRebuildInterceptor } from 'src/response/response.interceptor';
import { ApiExceptionResponse } from 'src/response/response.type';
import { OrdersService } from '../service/orders.service';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ) {}

    @Post()
    @ApiOperation({description: 'API create orders'})
    @ApiBadRequestResponse({description: 'Form data validation failed.', type: ApiExceptionResponse})
    @ApiCreatedResponse({description: 'Success to create orders.', type: OrdersResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async create(@Body() orders: OrdersDTO): Promise<OrdersEntity> {
        return await this.ordersService.create(orders);
    }

    @Delete(':id')
    @ApiOperation({description: 'API delete orders'})
    @ApiNotFoundResponse({description: 'Not found.', type: ApiExceptionResponse})
    @ApiNoContentResponse({description: 'Successfully delete orders.'})
    async delete(@Param('id')id: string): Promise<any> {
        return this.ordersService.delete(id);
    }

    @Get()
    @ApiOperation({description: 'API list orders'})
    @ApiOkResponse({description: 'If success get list of orders.', type: OrdersResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async findAll(): Promise<OrdersResponses> {
        const data = [] = await this.ordersService.findAll();
        return {data};
    }

    @Get('paging')
    @ApiOperation({description: 'API find with paging orders'})
    @ApiOkResponse({description: 'If success find with paging orders.', type:OrdersResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async findWithPaging(
        @Query('term') term?: string,
        @Query('order') order?: 'orderDate',
        @Query('sort') sort: 'asc' | 'desc' = 'asc',
    ): Promise<OrdersResponses> {
        const { result: data = [] } = await this.ordersService.findWithPaging({term, order, sort, page: 1, rowsPerPage: 3});

        return {data};
    }
}
