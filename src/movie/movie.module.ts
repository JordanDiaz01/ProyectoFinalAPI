import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './schemas/movie.schemas';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{name:'Movie',schema:MovieSchema}]),AuthModule],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}
