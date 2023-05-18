import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { MongooseModule } from "@nestjs/mongoose";


@Module({
    imports:[
        MongooseModule.forRoot(process.env.DB_URI)
    ],
    providers:[DatabaseService],
    exports: [DatabaseService]
})
export class DatabaseModule{}