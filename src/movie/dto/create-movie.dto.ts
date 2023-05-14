import { IsEmpty, IsEnum, IsNotEmpty, IsString } from "class-validator"
import { Category } from "../schemas/movie.schemas"
import { User } from "src/auth/schemas/user.schema"


export class CreateMovieDTO{

    @IsNotEmpty()
    @IsString()
    readonly title:string

    @IsNotEmpty()
    @IsString()
    readonly description:string

    @IsNotEmpty()
    @IsString()
    readonly director: string

  
     imgMovie: string

     @IsNotEmpty()
     @IsString()
    readonly releasedate: string

    @IsNotEmpty()
    @IsEnum(Category,{message:"ingrese una categoria valida (Adventure,Horror,Action,Fantasy)"})
    readonly category: Category

    @IsEmpty({message: 'no debes pasar el userid'})
    readonly user:User
}