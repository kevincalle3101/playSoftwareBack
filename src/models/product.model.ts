import mongoose, { Model, Document } from "mongoose";
import { IProduct } from "./constants";

interface ProductModelType extends Model<IProduct> {
  make(fields: { title: string; description: string; imageUrl: string; userId: string }): ProductModel;
}

const ProductSchema = new mongoose.Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true }
}, { timestamps: true });

ProductSchema.statics.make = function(fields: { title: string; description: string; imageUrl: string; userId: string }): ProductModel {
  return new this(fields);
};

export const ProductModel = mongoose.model<IProduct, ProductModelType>('Product', ProductSchema);

export interface ProductModel extends IProduct, Document {}