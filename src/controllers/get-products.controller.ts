import { ProductBadFieldException } from "../models/errors/product-bad-field.exception";
import { GetAllProductService } from "../services/get-products.service";
import { Request, Response } from "express";


export class GetProductsController  {
    public constructor (
        private readonly getAllProductsService: GetAllProductService
    ) {}

    public async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.query;
            const {data} = await this.getAllProductsService.execute(userId as string)
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