import { Request, Response } from "express";
import { OrderServices } from "./order.services";
import orderValidationSchema from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;
        const validatedData = orderValidationSchema.safeParse(orderData);

        if (!validatedData.success) {
            const validationErrors = validatedData.error.format();

            res.status(400).json({
                success: false,
                message: 'Validation failed!',
                error: validationErrors,
            });
        } else {
            const manageInventory = await OrderServices.handleProductInventory(validatedData.data);

            if (!manageInventory.success) {
                res.status(200).json(manageInventory);
            }else {
                const result = await OrderServices.createOrderIntoDB(validatedData.data);
    
                res.status(200).json({
                    success: true,
                    message: 'Order created succesfully!',
                    data: result,
                });
            }
            
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        });
    }
}

const getAllOrders = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;
        const result = await OrderServices.getAllOrdersFromDB(email as string ?? null);

        res.status(200).json({
            success: true,
            message: 'Order fetched succesfully!',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        });
    }
}

export const OrderControllers = {
    getAllOrders,
    createOrder
};