import { pgTable, text, timestamp, integer, boolean, pgEnum, uuid, jsonb, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// Enums
export const userRoleEnum = pgEnum("user_role", ["ADMIN", "DEVELOPER", "VIEWER"])
export const projectStatusEnum = pgEnum("project_status", ["DRAFT", "PUBLISHED"])
export const courseLevelEnum = pgEnum("course_level", ["Beginner", "Intermediate", "Advanced"])
export const courseStatusEnum = pgEnum("course_status", ["DRAFT", "PUBLISHED"])
export const contactStatusEnum = pgEnum("contact_status", ["NEW", "READ", "ARCHIVED"])

// Auth tables (NextAuth compatible)
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("email_verified"),
  image: text("image"),
  passwordHash: text("password_hash"),
  role: userRoleEnum("role").default("VIEWER").notNull(),
  handle: text("handle").unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  emailIdx: index("user_email_idx").on(table.email),
  handleIdx: index("user_handle_idx").on(table.handle),
}))

export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionToken: text("session_token").unique().notNull(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  expires: timestamp("expires").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const verificationTokens = pgTable("verification_tokens", {
  identifier: text("identifier").notNull(),
  token: text("token").unique().notNull(),
  expires: timestamp("expires").notNull(),
})

// Site content tables
export const heroSlides = pgTable("hero_slides", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  ctaLabel: text("cta_label"),
  ctaHref: text("cta_href"),
  imageUrl: text("image_url"),
  order: integer("order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const management = pgTable("management", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  name: text("name").notNull(),
  roleTitle: text("role_title").notNull(),
  bio: text("bio"),
  imageUrl: text("image_url"),
  linkedinUrl: text("linkedin_url"),
  twitterUrl: text("twitter_url"),
  order: integer("order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  slugIdx: index("management_slug_idx").on(table.slug),
}))

// Portfolio tables
export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  summary: text("summary"),
  content: text("content"),
  coverUrl: text("cover_url"),
  repoUrl: text("repo_url"),
  demoUrl: text("demo_url"),
  status: projectStatusEnum("status").default("DRAFT").notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
  tech: jsonb("tech").$type<string[]>().default([]),
  authorId: uuid("author_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  slugIdx: index("project_slug_idx").on(table.slug),
  authorIdx: index("project_author_idx").on(table.authorId),
}))

export const projectImages = pgTable("project_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .references(() => projects.id, { onDelete: "cascade" })
    .notNull(),
  url: text("url").notNull(),
  alt: text("alt"),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Services table
export const services = pgTable("services", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  icon: text("icon"),
  priceRange: text("price_range"),
  tags: jsonb("tags").$type<string[]>().default([]),
  isFeatured: boolean("is_featured").default(false).notNull(),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  slugIdx: index("service_slug_idx").on(table.slug),
}))

// Courses table
export const courses = pgTable("courses", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  level: courseLevelEnum("level").default("Beginner").notNull(),
  durationMinutes: integer("duration_minutes"),
  price: integer("price"),
  tags: jsonb("tags").$type<string[]>().default([]),
  thumbnailUrl: text("thumbnail_url"),
  instructors: jsonb("instructors").$type<string[]>().default([]),
  publishedAt: timestamp("published_at"),
  status: courseStatusEnum("status").default("DRAFT").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  slugIdx: index("course_slug_idx").on(table.slug),
}))

// Developer profiles table
export const developerProfiles = pgTable("developer_profiles", {
  userId: uuid("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  headline: text("headline"),
  bio: text("bio"),
  skills: jsonb("skills").$type<string[]>().default([]),
  websiteUrl: text("website_url"),
  githubUrl: text("github_url"),
  linkedinUrl: text("linkedin_url"),
  xUrl: text("x_url"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Contact messages table
export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  status: contactStatusEnum("status").default("NEW").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  developerProfile: one(developerProfiles),
  projects: many(projects),
  accounts: many(accounts),
  sessions: many(sessions),
}))

export const projectsRelations = relations(projects, ({ one, many }) => ({
  author: one(users, {
    fields: [projects.authorId],
    references: [users.id],
  }),
  images: many(projectImages),
}))

export const projectImagesRelations = relations(projectImages, ({ one }) => ({
  project: one(projects, {
    fields: [projectImages.projectId],
    references: [projects.id],
  }),
}))

export const developerProfilesRelations = relations(developerProfiles, ({ one }) => ({
  user: one(users, {
    fields: [developerProfiles.userId],
    references: [users.id],
  }),
}))

// Indexes are now defined inline with each table
