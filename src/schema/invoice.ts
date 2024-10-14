import { z } from "zod";

export const invoiceSchema = z.object({
  orderId: z.number(),
  city: z.string(),
  country: z.string(),
  postalCode: z.string(),
  state: z.string(),
  streetLine1: z.string().optional(),
  streetLine2: z.string().optional(),
});
