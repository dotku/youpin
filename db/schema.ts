import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";

export const leadStatus = pgEnum("lead_status", [
  "new",
  "in_progress",
  "replied",
  "closed",
  "spam",
]);

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 60 }),
  company: varchar("company", { length: 200 }),
  message: text("message").notNull(),
  locale: varchar("locale", { length: 8 }),
  source: varchar("source", { length: 60 }).default("website"),
  userAgent: text("user_agent"),
  ipHash: varchar("ip_hash", { length: 64 }),
  status: leadStatus("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const replies = pgTable("replies", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id")
    .notNull()
    .references(() => leads.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  sentByEmail: varchar("sent_by_email", { length: 200 }).notNull(),
  sentByName: varchar("sent_by_name", { length: 120 }),
  providerMessageId: varchar("provider_message_id", { length: 200 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type Reply = typeof replies.$inferSelect;
export type NewReply = typeof replies.$inferInsert;
