import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class User extends Document {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  magasinSelectionne: string;

  @Prop({ required: false })
  carteFidelite?: string;

  @Prop({ required: false })
  hashedRefreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
