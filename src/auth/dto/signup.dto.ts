import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"


export class SignUpDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name:string

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({},{message: 'Ingrese un email valido'})
    readonly email:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    readonly password: string
}