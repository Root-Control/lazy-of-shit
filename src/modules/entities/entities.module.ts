import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Entity, EntitySchema } from './entity.schema';
import { EntitiesController } from './entities.controller';
import { EntitiesService } from './entities.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Entity.name, schema: EntitySchema },
    ]),
  ],
  controllers: [EntitiesController],
  providers: [
    EntitiesService
  ],
  exports: [EntitiesService],
})
export class EntitiesModule {}