import { z } from "zod";

// const colorSchema = z.object({
//   id: z.number(),
//   color: z.string(),
//   quantity: z.number(),
// });

const imageSchema = z.object({
  id: z.number(),
  filename: z.string(),
});

export const productSchema = z.object({
  title: z.string().min(3),
  price: z.number(),
  categoryId: z.number(),
  manufactureId: z.number(),
  serieId: z.number(),
  description: z.string().optional(),
  stock: z.number(),
  // images: z.array(imageSchema),
});
