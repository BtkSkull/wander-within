import { z } from "zod";

export const intakeFormSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  dateOfBirth: z.string().optional(),
  emergencyContact: z.string().optional(),
  medicalHistory: z.string().optional(),
  mentalHealthHistory: z.string().optional(),
  currentMedications: z.string().optional(),
  reasonForVisit: z.string().optional(),
});