import { ProductModel } from "../models/product.model";
import { UpdateProductDto } from "./dto/update-product.dto";
import { IProduct } from "../models/constants/index";
import { ProductNotFoundException } from "./errors/product-not-found.exception";
import { UnauthorizedException } from "./errors/unathorized-exception";
import { ImageUploadService } from "./image-upload.service";
import { UserIdIsRequiredException } from "./errors/user-id-is-required.exception";


export class UpdateProductService {
    private imageUploadService: ImageUploadService;

    public constructor() {
        this.imageUploadService = new ImageUploadService();
    }

    public async execute(fields: UpdateProductDto, image: Express.Multer.File): Promise<{ data: IProduct }> {
        const { id, userId, ...updates } = fields;

        const existingProduct = await ProductModel.findById(id);
        if (!existingProduct) {
            throw new ProductNotFoundException();
        }

        if (!userId) {
            throw new UserIdIsRequiredException('actualizar');
        }

        if (existingProduct.userId !== userId) {
            throw new UnauthorizedException('editar');
        }

        if (image) {
            if (existingProduct.imageUrl) {
                await this.imageUploadService.deleteImage(existingProduct.imageUrl);
            }

            const imageUrl = await this.imageUploadService.uploadImage(image);
            updates.imageUrl = imageUrl;
        }
        
        Object.assign(existingProduct, updates);

        const updatedProduct = await existingProduct.save();

        return { data: updatedProduct };
    }
}