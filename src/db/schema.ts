import { pgTable, serial, text, integer, decimal, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

export const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  destination: text("destination").notNull(),
  duration: text("duration").notNull(),
  price: integer("price").notNull(),
  originalPrice: integer("original_price"),
  image: text("image").notNull(),
  featured: boolean("featured").default(false),
  rating: decimal("rating").default("4.5"),
  reviews: integer("reviews").default(0),
  description: text("description").notNull(),
  highlights: jsonb("highlights").default([]),
  inclusions: jsonb("inclusions").default([]),
  exclusions: jsonb("exclusions").default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  image: text("image").notNull(),
  description: text("description").notNull(),
  rating: decimal("rating").default("4.5"),
  packages: integer("packages").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  service: text("service"),
  message: text("message").notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  author: text("author").notNull(),
  category: text("category").notNull(),
  tags: jsonb("tags").default([]),
  readTime: text("read_time"),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  package: text("package"),
  approved: boolean("approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
