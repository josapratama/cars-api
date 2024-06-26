CREATE TABLE "cars" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "brand_id" varchar(50),
  "body_model" varchar,
  "engine_cylinder_configuration" varchar,
  "number_of_doors" integer,
  "seating_capacity" integer,
  "fuel_tank_capacity" varchar,
  "wheel_drive_system" varchar2,
  "machine" varchar,
  "created_at" timestamp,
  "updated_at" datetime
);

CREATE TABLE "brands" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "founder" varchar,
  "headquarters" varchar,
  "established" datetime,
  "type" varchar,
  "updated_at" datetime
);

ALTER TABLE "cars" ADD FOREIGN KEY ("id") REFERENCES "brands" ("id");
