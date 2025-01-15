import express from 'express';
import product from './products.router'

const router = express.Router()
export default (): express.Router => {
    product(router)
    return router;
};