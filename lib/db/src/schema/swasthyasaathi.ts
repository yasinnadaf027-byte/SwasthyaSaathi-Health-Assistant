import { createInsertSchema } from "drizzle-zod";
import {
  date,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const patientProfilesTable = pgTable("patient_profiles", {
  userId: text("user_id").primaryKey(),
  preferredLanguage: text("preferred_language").notNull().default("en"),
  age: text("age"),
  sex: text("sex"),
  pregnancyStatus: text("pregnancy_status"),
  emergencyContactName: text("emergency_contact_name"),
  emergencyContactPhone: text("emergency_contact_phone"),
  allergies: text("allergies").array().notNull().default([]),
  chronicConditions: text("chronic_conditions").array().notNull().default([]),
  currentMedications: text("current_medications").array().notNull().default([]),
  accessibility: jsonb("accessibility").$type<Record<string, unknown>>().notNull().default({}),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const assessmentsTable = pgTable("assessments", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  language: text("language").notNull(),
  chiefComplaint: text("chief_complaint").notNull(),
  symptomData: jsonb("symptom_data").$type<Record<string, unknown>>().notNull().default({}),
  riskLevel: text("risk_level").notNull().default("low"),
  riskReasons: jsonb("risk_reasons").$type<string[]>().notNull().default([]),
  redFlags: jsonb("red_flags").$type<string[]>().notNull().default([]),
  recommendedAction: text("recommended_action").notNull(),
  aiSummary: text("ai_summary"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const remindersTable = pgTable("reminders", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  dosage: text("dosage"),
  schedule: jsonb("schedule").$type<Record<string, unknown>>().notNull().default({}),
  startDate: date("start_date", { mode: "string" }),
  endDate: date("end_date", { mode: "string" }),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertProfileSchema = createInsertSchema(patientProfilesTable);
export const insertAssessmentSchema = createInsertSchema(assessmentsTable);
export const insertReminderSchema = createInsertSchema(remindersTable);

export type PatientProfile = typeof patientProfilesTable.$inferSelect;
export type AssessmentRecord = typeof assessmentsTable.$inferSelect;
export type ReminderRecord = typeof remindersTable.$inferSelect;
export type InsertPatientProfile = z.infer<typeof insertProfileSchema>;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type InsertReminder = z.infer<typeof insertReminderSchema>;