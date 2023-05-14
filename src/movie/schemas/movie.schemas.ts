import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";

export enum Category{
    ADVENTURE ='Adventure',
    HORROR = 'Horror',
    ACTION = 'Action',
    FANTASY = 'Fantasy'

}
@Schema({
    timestamps: true
})

export class Movie {

    @Prop()
    title:string

    @Prop()
    description:string

    @Prop()
    director: string

    @Prop()
    imgMovie: string

    @Prop()
    releasedate: string

    @Prop()
    category: Category
    @Prop({type:mongoose.Schema.Types.ObjectId,ref: 'User'})
    user: User
}

export const MovieSchema = SchemaFactory.createForClass(Movie)