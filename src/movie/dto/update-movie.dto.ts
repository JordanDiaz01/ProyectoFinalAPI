import { User } from "src/auth/schemas/user.schema"
import { Category } from "../schemas/movie.schemas"
import { IsEmpty, IsEnum, IsOptional, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"


export class UpdateMovieDTO{
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly title:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly description:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly director: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly imgMovie: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly releasedate: string

    @ApiProperty()
    @IsOptional()
    @IsEnum(Category,{message:"ingrese una categoria valida (Adventure,Horror,Action,Fantasy)"})
    readonly category: Category

    
    @IsEmpty({message: 'no debes pasar el userid'})
    readonly user:User
}