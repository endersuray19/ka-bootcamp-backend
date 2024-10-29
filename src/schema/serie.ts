import {z} from"zod";
export const serieSchema = z.object({
    name:z.string().min(3),
});