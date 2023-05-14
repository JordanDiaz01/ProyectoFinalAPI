import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"


export class SignUpDto{
    @IsNotEmpty()
    @IsString()
    readonly name:string

    @IsNotEmpty()
    @IsEmail({},{message: 'Ingrese un email valido'})
    readonly email:string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    readonly password: string
}