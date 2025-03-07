import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
   

    @Prop({ required: true })
    chatId: string;
 
    @Prop()
    phoneNumber: string;
}

export const AuthSchema = SchemaFactory.createForClass(User);
