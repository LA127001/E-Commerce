import { Injectable, NotFoundException } from '@nestjs/common';
type productDTO = {
    id?: number,
    name: string,
    description: string,
    price: number,
    category: Array<String>,
    stock: number,
    imageURL?: string,
    rating: number,

}
@Injectable()
export class ProductsService {
    private productData: productDTO[] = [
        {
            id: 101,
            name: "smartphone",
            description: "moto g 85 very useful phone for casual purpose",
            price: 3000,
            category: ["smartphone", "electornic", "device"],
            stock: 11,
            imageURL: "https://m.media-amazon.com/images/I/21C+EF7Gt2L._QL70_FMwebp_.jpg",
            rating: 4.5
        },
        {
            id: 102,
            name: "TV",
            description: "Samsung very useful TV for casual purpose",
            price: 7000,
            category: ["tv", "electornic", "device"],
            stock: 14,
            imageURL: "https://m.media-amazon.com/images/I/21C+EF7Gt2L._QL70_FMwebp_.jpg",
            rating: 4.5
        },
    ]

    getAllProduct() {
        return this.productData;
    }

    getProductbyID(id: number) {
        const products = this.productData.find((p) => p.id === id);

        if (!products) {
            throw new NotFoundException("Product Not found");
        }
        return products;
    }

    createProduct(data: productDTO) {
        const newProduct: productDTO = {
            id: Date.now(),
            ...data
        }
        this.productData.push(newProduct)
        return newProduct;
    }

    updateProduct(id: number, data: productDTO) {
        const index = this.productData.findIndex((p) => p.id === id);
        if (index === -1) throw new NotFoundException("Product Not found!");
        this.productData[index] = { id, ...this.productData[index],...data };
        return this.productData[index];

    }

    deleteProduct(id: number) {
        const index = this.productData.findIndex((p) => p.id === id);
        if (index === -1) throw new NotFoundException("Product Not found!");
        const deleted = this.productData.splice(index, 1)
        return { message: "Product Deleted Successfully!", productData: deleted[0] };
    }

}
