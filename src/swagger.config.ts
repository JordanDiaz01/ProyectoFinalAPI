import {DocumentBuilder } from '@nestjs/swagger';
import {SwaggerTheme} from 'swagger-themes'

const theme = new SwaggerTheme('v3')
const options = {
    explorer: true,
    customCss: theme.getBuffer('dark')
  };
const config = new DocumentBuilder()
.addBearerAuth()
.setTitle('Movies API')
.setDescription('En esta api puedes hacer un abc de peliculas con imagenes!')
.setVersion('1.0')
.addTag('Movies')
.build();


export {config,options}