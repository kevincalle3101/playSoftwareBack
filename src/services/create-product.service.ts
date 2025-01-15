import { ProductModel } from "../models/product.model";
import { CreateProductDto } from "./dto/create-product.dto";
import { IProduct } from "../models/constants/index";
import { ImageUploadService } from "./image-upload.service";


export class CreateProductService {
    private imageUploadService: ImageUploadService;

    public constructor() {
        this.imageUploadService = new ImageUploadService();
    }
    
    public async execute(fields: CreateProductDto, image: Express.Multer.File): Promise<{data: IProduct}> {
        let imageUrl = '';
        if (image) {
            imageUrl = await this.imageUploadService.uploadImage(image);
        }

        const newProduct = await ProductModel.make({
            ...fields,
            imageUrl,
        }).save();

        return {data: newProduct};
    }
}