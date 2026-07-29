import { z } from "zod";

export const intakeFormSchema = z.object({
  fullName: z.string().min(2),
  preferredName: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(7),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  genderOther: z.string().optional(),
  occupation: z.string().optional(),
  cityCountry: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyContactRelationship: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  mode: z.string().optional(),
  reasonForVisit: z.string().optional(),
});