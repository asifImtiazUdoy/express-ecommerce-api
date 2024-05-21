import { z } from 'zod';
import { IInventory, IProduct, IVariant } from './product.interface';

// Define the Zod schema for the Variant
const variantSchema = z.object({
  type: z.string().nonempty(),
  value: z.string().nonempty(),
});

// Define the Zod schema for the Inventory
const inventorySchema = z.object({
  quantity: z.number().int().nonnegative(),
  inStock: z.boolean(),
});

// Define the Zod schema for the Product
const productValidationSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  price: z.number().positive(),
  category: z.string().nonempty(),
  tags: z.array(z.string().nonempty()),
  variants: z.array(variantSchema),
  inventory: inventorySchema,
});

// Export the Zod schemas
export default productValidationSchema;