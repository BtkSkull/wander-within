import { z } from "zod";

export const consentFormSchema = z.object({
  clientName: z.string().min(2),
  email: z.string().email(),
  agreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the consent terms",
  }),
  signature: z.string().optional(),
});