import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  whatsapp: z.string().optional(),
  message: z.string().min(5, "Message is too short"),
});