import { IProduct } from "src/models/constants";
import { ProductModel } from "../models/product.model";
import { UserIdIsRequiredException } from "./errors/user-id-is-required.exception";



export class GetAllProductService {
    public constructor(){}

    public async execute(userId: string ) : Promise<{data: IProduct[]}> {
        const filter: { userId?: string } = {};

        if (userId) {
            filter.userId = userId;
        } else {
            throw new UserIdIsRequiredException('obtener');
        }

        const ProductsFound: IProduct[] = await ProductModel.find(filter);

        return {data: ProductsFound};
    }
}