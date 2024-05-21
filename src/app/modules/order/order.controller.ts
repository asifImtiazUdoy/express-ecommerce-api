import { Request, Response } from "express";
import { OrderServices } from "./order.services";

const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;
        const result = await OrderServices.createOrderIntoDB(orderData);

        res.status(200).json({
            success: true,
            message: 'Order created succesfully!',
            data: result,
        });
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