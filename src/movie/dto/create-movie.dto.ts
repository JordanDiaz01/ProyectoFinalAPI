import { IsEmpty, IsEnum, IsNotEmpty, IsString } from "class-validator"
import { Category } from "../schemas/movie.schemas"
import { User } from "src/auth/schemas/user.schema"
import { ApiProperty } from "@nestjs/swagger"


export class CreateMovieDTO{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly title:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly description:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly director: string

    @ApiProperty()
     imgMovie: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly releasedate: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(Category,{message:"ingrese una categoria valida (Adventure,Horror,Action,Fantasy)"})
    readonly category: Category

    @IsEmpty({message: 'no debes pasar el userid'})
    readonly user:User
}