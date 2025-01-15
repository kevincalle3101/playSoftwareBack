import { Request, Response } from "express";
import { CreateProductService } from "../services/create-product.service";
import { ProductBadFieldException } from "../models/errors/product-bad-field.exception";


export class CreateProductController  {
    public constructor (
        private readonly createProductService: CreateProductService,
    ) {}

    public async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const {data} = await this.createProductService.execute(req.body, req.file)

            res.status(200).json({ data });
            
        } catch (error) {
            if(error instanceof Error || error instanceof ProductBadFieldException) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal Server Error', error: error?.message });
            }
        }
    }
}