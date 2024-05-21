import { z } from 'zod';

const orderValidationSchema = z.object({
    email: z.string().email().min(3),
    productId: z.string().min(3),
    price: z.number().positive({ message: "Price must be a positive number" }),
    quantity: z.number().positive({ message: "Quantity must be a positive number" })
});

// Export the Zod schemas
export default orderValidationSchema;