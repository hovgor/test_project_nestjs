import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  imports:[
    forwardRef(() => UserModule)
  ],
  providers: [ProductService]
})
export class ProductModule {}
