import { Prop, SchemaFactory, Schema} from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class TunisianetProduits extends Document {
  @Prop()
  title: string;

  @Prop()
  productLink: string;

  @Prop()
  imgSrc: string;

  @Prop()
  price: number;
}

export const TunisianetProduitsSchema =
  SchemaFactory.createForClass(TunisianetProduits);
