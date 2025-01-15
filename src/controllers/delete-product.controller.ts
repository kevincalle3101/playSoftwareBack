import { ProductBadFieldException } from "../models/errors/product-bad-field.exception";
import { DeleteProductService } from "../services/delete-product.service";
import { Request, Response } from "express";


export class DeleteProductController {
    public constructor(
        private readonly deleteAllProductsService: DeleteProductService
    ) { }

    public async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { userId } = req.query;            
            await this.deleteAllProductsService.execute(id, userId as string)
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            if (error instanceof Error || error instanceof ProductBadFieldException) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal Server Error', error: error?.message });
            }
        }
    }
} 