import {
  pgTable,
  serial,
  varchar,
  boolean,
  text,
  integer,
  timestamp,
  date,
} from "drizzle-orm/pg-core";

export const AIOutput = pgTable("aiOutput", {
  id: serial("id").primaryKey(),
  formData: varchar("formData").notNull(),
  aiResponse: text("aiResponse").notNull(),
  templateSlug: varchar("templateSlug").notNull(),
  createdBy: varchar("createdBy"),
  createdAt: date("createdAt"),
});

export const Subscriptions = pgTable("Subscriptions", {
  id: serial("id").primaryKey(),
  email: varchar("email").notNull(),
  userName: varchar("userName").notNull(),
  type: varchar("type").notNull(),
  paymentId: varchar("paymentId").notNull(),
  joinDate: timestamp("joinDate").notNull(),
  endDate: timestamp("endDate").notNull(),
});

export const Users = pgTable("Users", {
  id: serial("id").primaryKey(),
  userName: varchar("userName").notNull(),
  email: varchar("email").notNull(),
  active: boolean("active").notNull(),
  cradits: integer("cradits").notNull(),
  avatar: varchar("avatar"),
});
