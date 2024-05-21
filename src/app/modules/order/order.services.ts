import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (order: IOrder) => {
    const result = await Order.create(order);
    return result;
};

const getAllOrdersFromDB = async (email?: string) => {
    const result = await Order.find(email !== null ? { email: email }:{});
    return result;
};

export const OrderServices = {
    createOrderIntoDB,
    getAllOrdersFromDB
};