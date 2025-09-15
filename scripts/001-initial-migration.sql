-- Create enums
CREATE TYPE "user_role" AS ENUM('ADMIN', 'DEVELOPER', 'VIEWER');
CREATE TYPE "project_status" AS ENUM('DRAFT', 'PUBLISHED');
CREATE TYPE "course_level" AS ENUM('Beginner', 'Intermediate', 'Advanced');
CREATE TYPE "course_status" AS ENUM('DRAFT', 'PUBLISHED');
CREATE TYPE "contact_status" AS ENUM('NEW', 'READ', 'ARCHIVED');

-- Create users table
CREATE TABLE "users" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT,
  "email" TEXT UNIQUE NOT NULL,
  "email_verified" TIMESTAMP,
  "image" TEXT,
  "password_hash" TEXT,
  "role" "user_role" DEFAULT 'VIEWER' NOT NULL,
  "handle" TEXT UNIQUE,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create auth tables for NextAuth
CREATE TABLE "accounts" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID REFERENCES "users"("id") ON DELETE CASCADE NOT NULL,
  "type" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "provider_account_id" TEXT NOT NULL,
  "refresh_token" TEXT,
  "access_token" TEXT,
  "expires_at" INTEGER,
  "token_type" TEXT,
  "scope" TEXT,
  "id_token" TEXT,
  "session_state" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE "sessions" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "session_token" TEXT UNIQUE NOT NULL,
  "user_id" UUID REFERENCES "users"("id") ON DELETE CASCADE NOT NULL,
  "expires" TIMESTAMP NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE "verification_tokens" (
  "identifier" TEXT NOT NULL,
  "token" TEXT UNIQUE NOT NULL,
  "expires" TIMESTAMP NOT NULL
);

-- Create site content tables
CREATE TABLE "hero_slides" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" TEXT NOT NULL,
  "subtitle" TEXT,
  "cta_label" TEXT,
  "cta_href" TEXT,
  "image_url" TEXT,
  "order" INTEGER DEFAULT 0 NOT NULL,
  "is_active" BOOLEAN DEFAULT TRUE NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE "management" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "slug" TEXT UNIQUE NOT NULL,
  "name" TEXT NOT NULL,
  "role_title" TEXT NOT NULL,
  "bio" TEXT,
  "image_url" TEXT,
  "linkedin_url" TEXT,
  "twitter_url" TEXT,
  "order" INTEGER DEFAULT 0 NOT NULL,
  "is_active" BOOLEAN DEFAULT TRUE NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create portfolio tables
CREATE TABLE "projects" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "slug" TEXT UNIQUE NOT NULL,
  "title" TEXT NOT NULL,
  "summary" TEXT,
  "content" TEXT,
  "cover_url" TEXT,
  "repo_url" TEXT,
  "demo_url" TEXT,
  "status" "project_status" DEFAULT 'DRAFT' NOT NULL,
  "tags" JSONB DEFAULT '[]',
  "tech" JSONB DEFAULT '[]',
  "author_id" UUID REFERENCES "users"("id") ON DELETE CASCADE NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE "project_images" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "project_id" UUID REFERENCES "projects"("id") ON DELETE CASCADE NOT NULL,
  "url" TEXT NOT NULL,
  "alt" TEXT,
  "order" INTEGER DEFAULT 0 NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create services table
CREATE TABLE "services" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "slug" TEXT UNIQUE NOT NULL,
  "title" TEXT NOT NULL,
  "excerpt" TEXT,
  "content" TEXT,
  "icon" TEXT,
  "price_range" TEXT,
  "tags" JSONB DEFAULT '[]',
  "is_featured" BOOLEAN DEFAULT FALSE NOT NULL,
  "order" INTEGER DEFAULT 0 NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create courses table
CREATE TABLE "courses" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "slug" TEXT UNIQUE NOT NULL,
  "title" TEXT NOT NULL,
  "excerpt" TEXT,
  "content" TEXT,
  "level" "course_level" DEFAULT 'Beginner' NOT NULL,
  "duration_minutes" INTEGER,
  "price" INTEGER,
  "tags" JSONB DEFAULT '[]',
  "thumbnail_url" TEXT,
  "instructors" JSONB DEFAULT '[]',
  "published_at" TIMESTAMP,
  "status" "course_status" DEFAULT 'DRAFT' NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create developer profiles table
CREATE TABLE "developer_profiles" (
  "user_id" UUID PRIMARY KEY REFERENCES "users"("id") ON DELETE CASCADE,
  "headline" TEXT,
  "bio" TEXT,
  "skills" JSONB DEFAULT '[]',
  "website_url" TEXT,
  "github_url" TEXT,
  "linkedin_url" TEXT,
  "x_url" TEXT,
  "avatar_url" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create contact messages table
CREATE TABLE "contact_messages" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "status" "contact_status" DEFAULT 'NEW' NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create indexes
CREATE INDEX "user_email_idx" ON "users"("email");
CREATE INDEX "user_handle_idx" ON "users"("handle");
CREATE INDEX "project_slug_idx" ON "projects"("slug");
CREATE INDEX "project_author_idx" ON "projects"("author_id");
CREATE INDEX "service_slug_idx" ON "services"("slug");
CREATE INDEX "course_slug_idx" ON "courses"("slug");
CREATE INDEX "management_slug_idx" ON "management"("slug");

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hero_slides_updated_at BEFORE UPDATE ON hero_slides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_management_updated_at BEFORE UPDATE ON management FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_developer_profiles_updated_at BEFORE UPDATE ON developer_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
