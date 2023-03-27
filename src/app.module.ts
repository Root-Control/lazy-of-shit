
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './modules/articles/articles.module';

@Module({
  imports: [
  MongooseModule.forRoot('mongodb://localhost/nestjs-example'),
  ArticlesModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

