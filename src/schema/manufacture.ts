import {z} from "zod";
export const manufactureSchema = z.object({
    name:z.string().min(3),
    description:z.string().min(3),
});
