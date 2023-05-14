import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Movie } from './schemas/movie.schemas';
import { User } from 'src/auth/schemas/user.schema';


@Injectable()
export class MovieService {
    constructor(
        @InjectModel(Movie.name)
        private movieModel: mongoose.Model<Movie>
    ){}



    async findAll(): Promise<Movie[]>{
        const movies = await this.movieModel.find()
        return movies
    }

    async create(movie:Movie,user:User): Promise<Movie>{
        const data = Object.assign(movie,{user:user._id})
        const res  = await this.movieModel.create(data)
        return res
    }

    async findById(id:string): Promise<Movie>{
        const isValid = mongoose.isValidObjectId(id)
        if(!isValid){
            throw new BadRequestException('Ingresé un id valido ')
        }
        const movie  = await this.movieModel.findById(id)
        if(!movie){
            throw new NotFoundException('No se encontró la pelicula :(')
        }
        return movie
    }

    async UpdateById(id:string,movie:Movie): Promise<Movie>{
        const movieUpdated  = await this.movieModel.findByIdAndUpdate(id,movie,{
            new:true,
            runValidators: true
        })
        return movieUpdated
    }

    async deleteMovie(id:string):Promise<void>{
        await this.movieModel.deleteOne(
        {
            _id: new mongoose.Types.ObjectId(id)
        }
       )
    }
}
