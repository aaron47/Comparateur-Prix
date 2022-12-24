import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Produits extends Document {
  @Prop()
  title: string;

  @Prop()
  productLink: string;

  @Prop()
  imgSrc: string;

  @Prop()
  price: number;
}

export const ProduitsSchema = SchemaFactory.createForClass(Produits);
