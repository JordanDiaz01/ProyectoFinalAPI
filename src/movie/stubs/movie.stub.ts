import { User, UserSchema } from "src/auth/schemas/user.schema";
import { Category, Movie } from "../schemas/movie.schemas";
import { CreateMovieDTO } from "../dto/create-movie.dto";

export const moviestub = ():Movie=>{
    return{
        "title": "prueba5cambiada",
                    "description": "prueba2",
                    "director": "prueba3",
                    "imgMovie": "https://firebasestorage.googleapis.com/v0/b/moviesapi-fe493.appspot.com/o/96697003-4849-471e-beb8-e0a897f13822?alt=media&token=d0a22a54-cfb5-4471-a81b-a77f23f6260b",
                    "releasedate": "prueba fecha",
                    "category": Category.ADVENTURE,
                    "user": user
}
}

const user = {} as User