import {z} from "zod";
export const manufactureSchema = z.object({
    name:z.string().min(3),
    description:z.string().min(3),
});
const imageSchema = z.object({
    id: z.number(),
    filename: z.string(),
  });
  