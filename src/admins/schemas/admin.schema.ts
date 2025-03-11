import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserType, UserModule } from '../create-admin.dto';

export type AdminDocument = Admin & Document;

@Schema({ timestamps: true })
export class Admin {
    
    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: UserModule })
    module: UserModule;

    @Prop({ required: true, enum: UserType })
    userType: UserType;

    @Prop({ required: true, unique: true })
    email: string;
    
    @Prop({ required: true, unique: true })
    phone: string;


    @Prop( )
    createdById?: string;

    @Prop()
    rowStatus?: boolean;

}

export const AdminSchema = SchemaFactory.createForClass(Admin);
