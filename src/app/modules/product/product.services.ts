import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (product: IProduct) => {
    const result = await Product.create(product);
    return result;
};

const getAllProductsFromDB = async (searchTerm?: string) => {
    const result = await Product.find({
        $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
            { category: { $regex: searchTerm, $options: 'i' } }
        ]
    });
    return result;
};

const getSingleProductFromDB = async (id: string) => {
    const result = await Product.findOne({ _id: id });
    return result;
};

export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
};