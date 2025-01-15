import { ProductModel } from "../models/product.model";
import { ProductNotFoundException } from "./errors/product-not-found.exception";
import { UnauthorizedException } from "./errors/unathorized-exception";
import { UserIdIsRequiredException } from "./errors/user-id-is-required.exception";
import { ImageUploadService } from "./image-upload.service";


export class DeleteProductService {
    private imageUploadService: ImageUploadService;

    public constructor() {
        this.imageUploadService = new ImageUploadService();
    }

    public async execute(productId: string, userId: string): Promise<void> {

        const existingProduct = await ProductModel.findById(productId);
        if (!existingProduct) {
            throw new ProductNotFoundException();
        }

        if (!userId) {
            throw new UserIdIsRequiredException('eliminar');
        }
        if (existingProduct.userId !== userId) {
            throw new UnauthorizedException('eliminar');
        }

        if (existingProduct.imageUrl) {
            await this.imageUploadService.deleteImage(existingProduct.imageUrl);
        }

        await existingProduct.deleteOne();
    }
}