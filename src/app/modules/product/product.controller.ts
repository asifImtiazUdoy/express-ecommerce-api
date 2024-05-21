import { Request, Response } from "express";
import { ProductServices } from "./product.services";
import productValidationSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const validatedData = productValidationSchema.safeParse(productData);
        
        if (!validatedData.success) {
            const validationErrors = validatedData.error.format();

            res.status(400).json({
                success: false,
                message: 'Validation failed!',
                error: validationErrors,
            });
        } else {
            const result = await ProductServices.createProductIntoDB(validatedData.data);

            res.status(200).json({
                success: true,
                message: 'Product created succesfully!',
                data: result,
            });
        }
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
        const result = await ProductServices.getAllProductsFromDB(searchTerm as string ?? null);

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
        const { productId } = req.params;
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

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const result = await ProductServices.deleteProductFromDB(productId);

        res.status(200).json({
            success: true,
            message: 'Product deleted succesfully!',
            data: result.acknowledged ? null:result,
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
    updateProduct,
    deleteProduct,
};