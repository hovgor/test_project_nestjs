import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductDto } from "./dto/productDto";
import { Product } from "./product.entity";

@Injectable()
export class ProductService{
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ){}

    // create product 
    async createProduct(newProduct: ProductDto){
        try {
            return await this.productRepository.save(this.productRepository.create(newProduct));
        } catch (error) {
            Logger.log('error=>', error);
            throw error;
        }
    }

    // delete product 
    async deleteProduct(id: number){
        try {
            await this.productRepository.delete(id);
        } catch (error) {
            Logger.log('eror=>', error);
            throw error;
        }
    }

    // get product by id
    async getProductById(id: number){
        try {
            return await this.productRepository.findOne(id);
        } catch (error) {
            Logger.log('error=>', error);
            throw error;
        }
    }

    // get all products 
    async getAllProducts(){
        try {
            return await this.productRepository.find();
        } catch (error) {
            Logger.log('eror=>', error);
            throw error;
        }
    }

    // update product by id
    async updateProduct(id: number, data: ProductDto){
        try {
            return await this.productRepository.update({id: id}, data);
        } catch (error) {
            Logger.log('error=>', error);
            throw error;            
        }
    }


}