import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import {MovieService} from './movie.service'
import { getModelToken } from '@nestjs/mongoose';
import { Movie } from './schemas/movie.schemas';
import { CreateMovieDTO } from './dto/create-movie.dto';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { Connection } from 'mongoose';
import { DatabaseService } from 'src/database/database.service';
import { moviestub } from './stubs/movie.stub';


describe('MovieController', () => {
  let dbConnection: Connection
  let httpServer: any
  let app:any
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjAzNzgwZjI0YzI0YTkwNTA1MmE5NSIsImlhdCI6MTY4NDM3NTU1NiwiZXhwIjoxNjg0NDYxOTU2fQ.Z12N4_02YtLFvaWGqNrKFNtBYZHLTpezIoLs7MPex5g'
  beforeAll(async ()=>{
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
    dbConnection = moduleRef.get<DatabaseService>(DatabaseService).getDbHandle()
    httpServer = app.getHttpServer()
  })
afterAll(async ()=>{
  //await dbConnection.collection('movies').deleteMany({})
  await app.close()
})
  describe('getMovies',()=>{
    it('deberia retornar un arreglo de objetos de movies',async ()=>{
      await dbConnection.collection('movies').insertOne(moviestub())
      const response = await request(httpServer)
      .get('/movies')

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      //expect(response.body).toMatchObject([moviestub()])
    })
  })
  describe('createMovies',()=>{
    it('deberia crear una movie',async ()=>{
      const movie = {
        title: 'prueba8',
        description: 'prueba2',
        director: 'prueba3',
        imgMovie:
        'https://firebasestorage.googleapis.com/v0/b/moviesapi-fe493.appspot.com/o/c8ad08e0-e82f-4e4d-9c4a-f882958563ce?alt=media&token=390dff7f-4b3f-4f3a-8e93-b6317f230f2f',
        releasedate: 'prueba fecha',
        category: 'Adventure'
      };
      await dbConnection.collection('movies').insertOne(moviestub())
      const response = await request(httpServer)
      .post('/movies')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type','multipart/form-data')
      .field('title', movie.title)
      .field('description', movie.description)
        .field('director', movie.director)
        .field('releasedate', movie.releasedate)
        .field('category', movie.category)
        .attach('imgMovie', 'C:/Users/jorda/OneDrive/Pictures/Screenshots/Screenshot 2023-04-19 190207.png')
      expect(response.status).toBe(201)
      expect(typeof response.body).toBe('object')
    })
  })
  describe('UpdateMovies',()=>{
    it('deberia actualizar una movie',async ()=>{
      const movieID = '6465840aba4462c059b5ba5a'
      const movie = {
        title: 'Updated Movie',
        description: 'Updated Description',
        director: 'Updated Director',
        imgMovie: 'https://updated-image-url.com',
        releasedate: 'Updated Release Date',
        category: 'Updated Category',
      };
      await dbConnection.collection('movies').insertOne(moviestub())
      const response = await request(httpServer)
      .put(`/movies/${movieID}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(movie)
      expect(response.body).toBeDefined()
      expect(typeof response.body).toBe('object')
      expect(response.body._id).toEqual(movieID);
      expect(response.body.title).toEqual(movie.title);
      
    })
  })
  describe('DeleteMovies',()=>{
    it('deberia eliminar una movie',async ()=>{
      const movieID = '646009932cbf0895bb85ae8d'
      await dbConnection.collection('movies').insertOne(moviestub())
      const response = await request(httpServer)
      .delete(`/movies/${movieID}`)
      .set('Authorization', `Bearer ${authToken}`)
      expect(response.body).toBeDefined();
      expect(typeof response.body).toBe('object');
      expect(response.body.message).toEqual('pelicula eliminada');
    })
  })

  describe('GetMovie',()=>{
    it('deberia regresarme los detalles de una pelicula',async ()=>{
      const movieID = '6465824d5409ff15a10725ec'
      const movie = {
        "_id": "6465824d5409ff15a10725ec",
        "title": "prueba5cambiada",
        "description": "prueba2",
        "director": "prueba3",
        "imgMovie": "https://firebasestorage.googleapis.com/v0/b/moviesapi-fe493.appspot.com/o/96697003-4849-471e-beb8-e0a897f13822?alt=media&token=d0a22a54-cfb5-4471-a81b-a77f23f6260b",
        "releasedate": "prueba fecha",
        "category": "Adventure"
      }
      await dbConnection.collection('movies').insertOne(moviestub())
      const response = await request(httpServer)
      .get(`/movies/${movieID}`)
      //.set('Authorization', `Bearer ${authToken}`)
      
      
      expect(response.body).toMatchObject(movie)
    })
  })
});
