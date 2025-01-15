import express from 'express'
import { Request, Response } from "express";
import multer from 'multer';

import { CreateProductController } from '../controllers/create-product.controller';
import { GetProductsController } from '../controllers/get-products.controller';
import { CreateProductService } from '../services/create-product.service';
import { GetAllProductService } from '../services/get-products.service';
import { UpdateProductService } from '../services/update-product.service';
import { UpdateProductController } from '../controllers/update-product.controller';
import { DeleteProductService } from '../services/delete-product.service';
import { DeleteProductController } from '../controllers/delete-product.controller';

const storage = multer.memoryStorage();
const upload = multer({ storage }); 


export default (router: express.Router) => {
    const getAllProductsService    = new GetAllProductService();
    const getProductController   = new GetProductsController(getAllProductsService);
    const createProductervice    = new CreateProductService();
    const createProductController = new CreateProductController(createProductervice);
    const updateProductervice    = new UpdateProductService();
    const updateProductController = new UpdateProductController(updateProductervice);
    const deleteProductervice    = new DeleteProductService();
    const deleteProductController = new DeleteProductController(deleteProductervice);
    
    router.get('/product/', (req: Request, res: Response) => getProductController.getAllProducts(req, res))
    router.post('/product/', upload.single('image'), (req: Request, res: Response) => createProductController.createProduct(req, res))
    router.patch('/product/:id', upload.single('image'), (req: Request, res: Response) => updateProductController.updateProduct(req, res))
    router.delete('/product/:id', (req: Request, res: Response) => deleteProductController.deleteProduct(req, res))
}


