import { Controller, Get,Post,Put,Delete,Body,UploadedFile, UseInterceptors, Param, UseGuards, Req,Res } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './schemas/movie.schemas';
import {uploadFile} from '../firebase/fb.config'
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('movies')
export class MovieController {
    constructor(
        private movieService: MovieService
    ){}

    @Get()
    async getAllMovies(): Promise<Movie[]>{
        return this.movieService.findAll()
    }

    @Get(':id')
    async getMovie(@Param('id') id:string): Promise<Movie>{
        return this.movieService.findById(id)
    }

    @Post()
    @UseGuards(AuthGuard())
    @UseInterceptors(FileInterceptor('imgMovie'))
    async createMovie(@UploadedFile() file,@Body() movie:CreateMovieDTO,@Req() req): Promise<Movie>{
        
        const imgCast = await uploadFile(file)
        movie.imgMovie = imgCast
        return this.movieService.create(movie,req.user)
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    async UpdateMovie(@Param('id') id:string,@Body() movie:UpdateMovieDTO): Promise<Movie>{
        return this.movieService.UpdateById(id,movie)
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async DeleteMovie(@Param('id') id:string,@Res() response): Promise<void>{
        
        response.send({message:'movie eliminada'})
        return this.movieService.deleteMovie(id)
        
    }
}
