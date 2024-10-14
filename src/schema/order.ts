import { z } from "zod";

const itemSchema = z.object({
  productId: z.number(),
  colorId: z.number(),
  quantity: z.number(),
});

export const orderSchema = z.object({
  items: z.array(itemSchema),
  userId: z.number(),
});
