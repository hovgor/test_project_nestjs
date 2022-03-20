import { Controller, forwardRef, Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { ProductService } from './product.service';

@Controller('product')
@UseGuards(AuthGuard('verifyUser'))
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        @Inject(forwardRef(()=> UserService)) private readonly userService: UserService,
    ){}
    
}
