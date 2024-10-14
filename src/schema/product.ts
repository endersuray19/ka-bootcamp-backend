import { z } from "zod";

const colorSchema = z.object({
  id: z.number(),
  color: z.string(),
  quantity: z.number(),
});

// const imageSchema = z.object({
//   id: z.number(),
//   filename: z.string(),
// });

export const productSchema = z.object({
  name: z.string().min(3),
  price: z.number(),
  categoryId: z.number(),
  description: z.string().optional(),
  company: z.string(),
  colors: z.array(colorSchema),
  // images: z.array(imageSchema),
});
