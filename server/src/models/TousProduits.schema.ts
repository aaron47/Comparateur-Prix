import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class TousProduits extends Document {
  @Prop()
  title: string;

  @Prop()
  productLink: string;

  @Prop()
  imgSrc: string;

  @Prop()
  price: number;

  @Prop()
  manufacturer: string;
}

export const TousProduitsSchema = SchemaFactory.createForClass(TousProduits);
