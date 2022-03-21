import { Body, Controller, forwardRef, HttpStatus, Inject, Post, Res, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { ProductDto } from './dto/productDto';
import { ProductService } from './product.service';

@Controller('product')
@UseGuards(AuthGuard('verifyUser'))
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        @Inject(forwardRef(()=> UserService)) private readonly userService: UserService,
    ){}
        
        // create product
        @Post('createProduct')
        async createProduct(@Body() body: ProductDto, @Res() res: Response){
            try {
                const newProduct = await this.productService.createProduct({
                    name: body.name,
                    description: body.description,
                    category: body.category,
                    price: body.price,
                    user_id: body.user_id
                });

                return res.status(HttpStatus.OK).json({
                    success: true,
                    name: body.name,
                    id: body.user_id
                });

            } catch (error) {
                throw new UnprocessableEntityException(error);
            }
        }



}
