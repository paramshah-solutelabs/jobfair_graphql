alter table "public"."department" alter column "title" drop not null;
alter table "public"."department" add column "title" text;
