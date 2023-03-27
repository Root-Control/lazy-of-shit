
import { ProductsModule } from './modules/products/products.module';
import { ASModule } from './modules/as/as.module';
import { ProductsModule } from './modules/products/products.module';
import { ProductsModule } from './modules/products/products.module';
import { ProductsModule } from './modules/products/products.module';
import { ProductsModule } from './modules/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './modules/articles/articles.module';

@Module({
  imports: [
  MongooseModule.forRoot('mongodb://localhost/nestjs-example'),
  ArticlesModule,
  ProductsModule,
  ASModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

