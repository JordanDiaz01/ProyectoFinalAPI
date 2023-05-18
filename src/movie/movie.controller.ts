import { Controller, Get,Post,Put,Delete,Body,UploadedFile, UseInterceptors, Param, UseGuards, Req,Res } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './schemas/movie.schemas';
import {uploadFile} from '../firebase/fb.config'
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth,ApiOperation, ApiParam, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('Movies')
@Controller('movies')
export class MovieController {
    constructor(
        private movieService: MovieService
    ){}
    
    @ApiOperation({
        summary:"Regresa todas las peliculas que se encuentren disponibles"
    })
    @ApiResponse(
        {   status: 200, 
            description: 'La respuesta contiene un arreglo con todas las peliculas en formato objeto', 
            schema: {
              type: 'array',
              example: [
                {
                    "_id": "646009932cbf0895bb85ae8d",
                    "title": "prueba5cambiada",
                    "description": "prueba2",
                    "director": "prueba3",
                    "imgMovie": "https://firebasestorage.googleapis.com/v0/b/moviesapi-fe493.appspot.com/o/96697003-4849-471e-beb8-e0a897f13822?alt=media&token=d0a22a54-cfb5-4471-a81b-a77f23f6260b",
                    "releasedate": "prueba fecha",
                    "category": "Adventure",
                    "createdAt": "2023-05-13T22:05:07.465Z",
                    "updatedAt": "2023-05-13T22:32:34.922Z",
                    "__v": 0
                },
                {
                    "_id": "64603a02ebc9e431ba9db58f",
                    "title": "prueba7",
                    "description": "prueba2",
                    "director": "prueba3",
                    "imgMovie": "https://firebasestorage.googleapis.com/v0/b/moviesapi-fe493.appspot.com/o/9fff871d-15c0-4444-a4f6-26508ba0e797?alt=media&token=0401c340-9e28-46ad-adc6-a15f9172a932",
                    "releasedate": "prueba fecha",
                    "category": "Adventure",
                    "user": "64603780f24c24a905052a95",
                    "createdAt": "2023-05-14T01:31:46.031Z",
                    "updatedAt": "2023-05-14T01:31:46.031Z",
                    "__v": 0
                },
              ]
                
            }
    })
    @Get()
    async getAllMovies(): Promise<Movie[]>{
        return this.movieService.findAll()
    }

    @ApiOperation({
        summary:"Regresa una pelicula por id"
    })
    @ApiParam({
        name:'id'
    })
    @ApiResponse(
        {   status: 200, 
            description: 'La respuesta contiene un objeto con los datos de la pelicula', 
            schema: {
              type: 'json',
              example: {
                "_id": "646009932cbf0895bb85ae8d",
                "title": "prueba5cambiada",
                "description": "prueba2",
                "director": "prueba3",
                "imgMovie": "https://firebasestorage.googleapis.com/v0/b/moviesapi-fe493.appspot.com/o/96697003-4849-471e-beb8-e0a897f13822?alt=media&token=d0a22a54-cfb5-4471-a81b-a77f23f6260b",
                "releasedate": "prueba fecha",
                "category": "Adventure",
                "createdAt": "2023-05-13T22:05:07.465Z",
                "updatedAt": "2023-05-14T18:57:27.267Z",
                "__v": 0
            }
                
            }
    })
    @Get(':id')
    async getMovie(@Param('id') id:string): Promise<Movie>{
        return this.movieService.findById(id)
    }

    @ApiOperation({
        summary:"Agrega una nueva pelicula"
    })
    @ApiResponse(
        {   status: 201, 
            description: 'La respuesta contiene un objeto con los datos de la pelicula que se agregó', 
            schema: {
              type: 'json',
              example: {
                "title": "prueba8",
                "description": "prueba2",
                "director": "prueba3",
                "imgMovie": "https://firebasestorage.googleapis.com/v0/b/moviesapi-fe493.appspot.com/o/4ba8d3a7-1fa6-4da3-a015-88b7d83ca38d?alt=media&token=a6abd324-a420-415a-bbcb-d3a9589b1652",
                "releasedate": "prueba fecha",
                "category": "Adventure",
                "user": "64603780f24c24a905052a95",
                "_id": "64603a3bebc9e431ba9db595",
                "createdAt": "2023-05-14T01:32:43.179Z",
                "updatedAt": "2023-05-14T01:32:43.179Z",
                "__v": 0
            }
                
            }
    })
    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('imgMovie'))
    async createMovie(@UploadedFile() file,@Body() movie:CreateMovieDTO,@Req() req): Promise<Movie>{
        
        const imgCast = await uploadFile(file)
        movie.imgMovie = imgCast
        return this.movieService.create(movie,req.user)
    }

    @ApiOperation({
        summary:"Actualiza una pelicula por id"
    })
    @ApiResponse(
        {   status: 200, 
            description: 'La respuesta contiene un objeto con los datos de la pelicula actualizados', 
            schema: {
              type: 'json',
              example: {
                "_id": "646009932cbf0895bb85ae8d",
                "title": "prueba5cambiada",
                "description": "prueba2",
                "director": "prueba3",
                "imgMovie": "https://firebasestorage.googleapis.com/v0/b/moviesapi-fe493.appspot.com/o/96697003-4849-471e-beb8-e0a897f13822?alt=media&token=d0a22a54-cfb5-4471-a81b-a77f23f6260b",
                "releasedate": "prueba fecha",
                "category": "Adventure",
                "createdAt": "2023-05-13T22:05:07.465Z",
                "updatedAt": "2023-05-13T22:32:34.922Z",
                "__v": 0
            }
                
            }
    })
    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async UpdateMovie(@Param('id') id:string,@Body() movie:UpdateMovieDTO): Promise<Movie>{
        return this.movieService.UpdateById(id,movie)
    }

    @ApiOperation({
        summary:"Elimina una pelicula por id"
    })
    @ApiResponse(
        {   status: 200, 
            description: 'La respuesta contiene un mensaje de confirmación de la acción solicitada', 
            schema: {
              type: 'json',
              example: {message:'pelicula eliminada'}
            }
    })
    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async DeleteMovie(@Param('id') id:string,@Res() response): Promise<void>{
        
        response.send({message:'pelicula eliminada'})
        return this.movieService.deleteMovie(id)
        
    }
}
