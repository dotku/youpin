import { z } from "zod";

export const leadSubmitSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(60).optional().or(z.literal("")),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(5).max(5000),
  locale: z.string().trim().max(8).optional(),
  // Honeypot — must be empty
  website: z.string().max(0).optional(),
});

export const replySchema = z.object({
  body: z.string().trim().min(1).max(20000),
});

export const statusSchema = z.object({
  status: z.enum(["new", "in_progress", "replied", "closed", "spam"]),
});

export type LeadSubmit = z.infer<typeof leadSubmitSchema>;
