import { Request, Response } from "express";
import { UpdateProductService } from "../services/update-product.service";
import { ProductBadFieldException } from "../models/errors/product-bad-field.exception";


export class UpdateProductController {
    public constructor(
        private readonly updateProductService: UpdateProductService
    ) { }

    public async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { title, description, userId } = req.body;
            const image = req.file; 
            const { data } = await this.updateProductService.execute({
                id,
                title,
                description,
                userId,
            },
                image
            );
            res.status(200).json({ data });
        } catch (error) {
            if (error instanceof Error || error instanceof ProductBadFieldException) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal Server Error', error: error?.message });
            }
        }
    }
}