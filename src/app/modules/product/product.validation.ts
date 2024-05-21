import { z } from 'zod';

// Define the Zod schema for the Variant
const variantSchema = z.object({
  type: z.string().min(1),
  value: z.string().min(1),
});

// Define the Zod schema for the Inventory
const inventorySchema = z.object({
  quantity: z.number().int().nonnegative(),
  inStock: z.boolean(),
});

// Define the Zod schema for the Product
const productValidationSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  category: z.string().min(1),
  tags: z.array(z.string().min(1)),
  variants: z.array(variantSchema),
  inventory: inventorySchema,
});

// Export the Zod schemas
export default productValidationSchema;
