import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Add this decorator
export class User extends Document {

  @Prop({ required: true })
  chatId: string;

  @Prop({ required: true })
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true })
  username: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  isBan: boolean;

  @Prop({ required: true }) // Add type here, for example, String or Buffer (depending on your needs)
  password: string;  // Or use Buffer if you store hashed passwords as buffers
}

export const UserSchema = SchemaFactory.createForClass(User);
