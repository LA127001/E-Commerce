import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(readonly productData: ProductsService) { }

    @Get()
    getAllProduct() {
        return this.productData.getAllProduct();
    }

    @Get(':id')
    getProductbyID(@Param('id') id: string) {
        return this.productData.getProductbyID(Number(id));
    }

    @Post()
    createProduct(@Body() body: {
        name: string,
        description: string,
        price: number,
        category: Array<String>,
        stock: number,
        rating: number
    }) {
       return this.productData.createProduct(body)
    }

    @Put(':id')
    updateProduct(@Param('id') id:string, @Body() body: {
        name: string,
        description: string,
        price: number,
        category: Array<String>,
        stock: number,
        rating: number
    }){
        return this.productData.updateProduct(Number(id), body)
    }

    @Delete(':id')
    deleteProduct(@Param('id') id:string){
        return this.productData.deleteProduct(Number(id))
    }
}
