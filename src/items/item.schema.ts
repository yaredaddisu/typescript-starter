import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Item extends Document {
  @Prop({ required: true })
  first_name: string;

  @Prop()
  last_name: string;
 
}

export const ItemSchema = SchemaFactory.createForClass(Item);
