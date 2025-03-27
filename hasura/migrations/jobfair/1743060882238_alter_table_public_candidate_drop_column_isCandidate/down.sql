alter table "public"."candidate" alter column "isCandidate" set default true;
alter table "public"."candidate" alter column "isCandidate" drop not null;
alter table "public"."candidate" add column "isCandidate" bool;
