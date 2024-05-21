import { Product } from "../product/product.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (order: IOrder) => {
    const result = await Order.create(order);
    return result;
};

const getAllOrdersFromDB = async (email?: string) => {
    const result = await Order.find(email !== null ? { email: email } : {});
    return result;
};

const handleProductInventory = async (order: IOrder) => {
    const product = await Product.findOne({ _id: order.productId });
    if (product) {
        if (product.inventory.quantity >= order.quantity) {
            product.inventory.quantity -= order.quantity;
            product.inventory.inStock = product.inventory.quantity - order.quantity == 0 ? false:true;
            await product.save();
            return {
                success: true
            };
        } else {
            return {
                success: false,
                error: "Insufficient quantity available in inventory!"
            };
        }
    } else {
        return {
            success: false,
            error: "Entered product Id is not valid!"
        };
    }
};

export const OrderServices = {
    createOrderIntoDB,
    getAllOrdersFromDB,
    handleProductInventory
};