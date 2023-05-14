import { User } from "src/auth/schemas/user.schema"
import { Category } from "../schemas/movie.schemas"
import { IsEmpty, IsEnum, IsOptional, IsString } from "class-validator"


export class UpdateMovieDTO{
    @IsOptional()
    @IsString()

    readonly title:string

    @IsOptional()
    @IsString()
    readonly description:string

    @IsOptional()
    @IsString()
    readonly director: string

    @IsOptional()
    @IsString()
    readonly imgMovie: string

    @IsOptional()
    @IsString()
    readonly releasedate: string

    @IsOptional()
    @IsEnum(Category,{message:"ingrese una categoria valida (Adventure,Horror,Action,Fantasy)"})
    readonly category: Category

    @IsEmpty({message: 'no debes pasar el userid'})
    readonly user:User
}