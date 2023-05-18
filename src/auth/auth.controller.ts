import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags,ApiOperation, ApiResponse} from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @ApiOperation({
        summary:"Registra un nuevo usuario"
    })
    @ApiResponse(
        {   status: 201, 
            description: 'La respuesta contiene el token de inicio de sesión', 
            schema: {
              type: 'json',
              example: {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjAzNzgwZjI0YzI0YTkwNTA1MmE5NSIsImlhdCI6MTY4NDAyNzI2NCwiZXhwIjoxNjg0MTEzNjY0fQ.OQuUn5i1XATgXSLblWh9dlSpmE3Dmi2Jd1NSGxsjOtI"
            }
                
            }
    })
    @Post('/signup')
    async signUp(@Body() signUpDto:SignUpDto): Promise<{token:string}>{
        return this.authService.signUp(signUpDto)
    }

    @ApiOperation({
        summary:"Inicia sesion con un usuario válido"
    })
    @ApiResponse(
        {   status: 201, 
            description: 'La respuesta contiene el token de inicio de sesión', 
            schema: {
              type: 'json',
              example: {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjAzNzgwZjI0YzI0YTkwNTA1MmE5NSIsImlhdCI6MTY4NDAyNzI2NCwiZXhwIjoxNjg0MTEzNjY0fQ.OQuUn5i1XATgXSLblWh9dlSpmE3Dmi2Jd1NSGxsjOtI"
            }
                
            }
    })
    @Post('/login')
    async login(@Body() loginDto:LoginDto): Promise<{token:string}>{
        return this.authService.Login(loginDto)
    }

    
}
