import { Request, Response } from "express";
import { ProductServices } from "./product.services";

const createProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const result = await ProductServices.createProductIntoDB(productData);

        res.status(200).json({
            success: true,
            message: 'Product created succesfully!',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        });
    }
}

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const { searchTerm } = req.query;
        const result = await ProductServices.getAllProductsFromDB(searchTerm as string ?? '');

        res.status(200).json({
            success: true,
            message: 'Product fetched succesfully!',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        });
    }
}

const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const result = await ProductServices.getSingleProductFromDB(productId);

        res.status(200).json({
            success: true,
            message: 'Product fetched succesfully!',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        });
    }
}

const updateProduct = async (req: Request, res: Response) => {
    try {
        const {productId} = req.params;
        const productData = req.body;
        const result = await ProductServices.updateProductFromDB(productId, productData);

        res.status(200).json({
            success: true,
            message: 'Product Updated succesfully!',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        });
    }
}

export const ProductControllers = {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct
};