-- Enable pgcrypto for UUIDs
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create tables
CREATE TABLE IF NOT EXISTS "user" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    idp_sub VARCHAR(255) UNIQUE  -- Google/OIDC subject identifier
);

CREATE TABLE IF NOT EXISTS ingredient (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    type VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS recipe (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    steps TEXT
);

CREATE TABLE IF NOT EXISTS mealplan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    start_date DATE,
    end_date DATE,
    user_fk UUID,
    CONSTRAINT fk_mealplan_user FOREIGN KEY (user_fk) REFERENCES "user"(id)
);

CREATE TABLE IF NOT EXISTS mealplan_recipe (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mealplan_fk UUID,
    recipe_fk UUID,
    user_fk UUID,
    CONSTRAINT fk_mpr_mealplan FOREIGN KEY (mealplan_fk) REFERENCES mealplan(id),
    CONSTRAINT fk_mpr_recipe FOREIGN KEY (recipe_fk) REFERENCES recipe(id),
    CONSTRAINT fk_mpr_user FOREIGN KEY (user_fk) REFERENCES "user"(id)
);

CREATE TABLE IF NOT EXISTS ingredient_recipe (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ingredient_fk UUID,
    recipe_fk UUID,
    CONSTRAINT fk_ir_ingredient FOREIGN KEY (ingredient_fk) REFERENCES ingredient(id),
    CONSTRAINT fk_ir_recipe FOREIGN KEY (recipe_fk) REFERENCES recipe(id)
);

CREATE TABLE IF NOT EXISTS grocerylist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mealplan_fk UUID,
    ingredient_fk UUID,
    user_fk UUID,
    quantity VARCHAR(255),
    CONSTRAINT fk_gl_mealplan FOREIGN KEY (mealplan_fk) REFERENCES mealplan(id),
    CONSTRAINT fk_gl_ingredient FOREIGN KEY (ingredient_fk) REFERENCES ingredient(id),
    CONSTRAINT fk_gl_user FOREIGN KEY (user_fk) REFERENCES "user"(id)
);
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'api_fttj1bwzwbg8') THEN
      CREATE ROLE api_fttj1bwzwbg8 LOGIN PASSWORD 'supersecret';
   END IF;
END
$$;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO api_fttj1bwzwbg8;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO api_fttj1bwzwbg8;