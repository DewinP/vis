create table "public"."favorite_spots" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "spot_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "visible" boolean default true
);


create table "public"."profiles" (
    "id" uuid not null,
    "updated_at" timestamp with time zone default now(),
    "username" text,
    "full_name" text,
    "avatar_url" text,
    "website" text
);


alter table "public"."profiles" enable row level security;

create table "public"."report_feedback" (
    "id" uuid not null default gen_random_uuid(),
    "report_id" uuid not null,
    "user_id" uuid not null,
    "feedback_type" text not null,
    "feedback_comment" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "visible" boolean default true
);


create table "public"."reports" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "spot_id" uuid not null,
    "min_visibility" integer not null,
    "max_visibility" integer not null,
    "clarity" text not null,
    "flag_not_helpful" boolean default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "visible" boolean default true,
    "points" real not null
);


create table "public"."spots" (
    "id" uuid not null default gen_random_uuid(),
    "region" text not null,
    "location" text not null,
    "latitude" numeric(9,6) not null,
    "longitude" numeric(9,6) not null,
    "min_possible_vis" integer not null,
    "max_possible_vis" integer not null,
    "last_report_id" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "visible" boolean default true
);


create table "public"."users" (
    "id" uuid not null,
    "username" text not null,
    "rank" integer default 0,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "visible" boolean default true,
    "is_admin" boolean default false,
    "user_grade_points" double precision not null default '0'::double precision
);


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX favorite_spots_pkey ON public.favorite_spots USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

CREATE UNIQUE INDEX report_feedback_pkey ON public.report_feedback USING btree (id);

CREATE UNIQUE INDEX reports_pkey ON public.reports USING btree (id);

CREATE UNIQUE INDEX spots_pkey ON public.spots USING btree (id);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);

alter table "public"."favorite_spots" add constraint "favorite_spots_pkey" PRIMARY KEY using index "favorite_spots_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."report_feedback" add constraint "report_feedback_pkey" PRIMARY KEY using index "report_feedback_pkey";

alter table "public"."reports" add constraint "reports_pkey" PRIMARY KEY using index "reports_pkey";

alter table "public"."spots" add constraint "spots_pkey" PRIMARY KEY using index "spots_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."favorite_spots" add constraint "favorite_spots_spot_id_fkey" FOREIGN KEY (spot_id) REFERENCES spots(id) ON DELETE CASCADE not valid;

alter table "public"."favorite_spots" validate constraint "favorite_spots_spot_id_fkey";

alter table "public"."favorite_spots" add constraint "favorite_spots_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."favorite_spots" validate constraint "favorite_spots_user_id_fkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

alter table "public"."profiles" add constraint "username_length" CHECK ((char_length(username) >= 3)) not valid;

alter table "public"."profiles" validate constraint "username_length";

alter table "public"."report_feedback" add constraint "report_feedback_feedback_type_check" CHECK ((feedback_type = ANY (ARRAY['confirm'::text, 'flag'::text]))) not valid;

alter table "public"."report_feedback" validate constraint "report_feedback_feedback_type_check";

alter table "public"."report_feedback" add constraint "report_feedback_report_id_fkey" FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE not valid;

alter table "public"."report_feedback" validate constraint "report_feedback_report_id_fkey";

alter table "public"."report_feedback" add constraint "report_feedback_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."report_feedback" validate constraint "report_feedback_user_id_fkey";

alter table "public"."reports" add constraint "reports_clarity_check" CHECK ((clarity = ANY (ARRAY['hazy'::text, 'clear'::text]))) not valid;

alter table "public"."reports" validate constraint "reports_clarity_check";

alter table "public"."reports" add constraint "reports_spot_id_fkey" FOREIGN KEY (spot_id) REFERENCES spots(id) ON DELETE CASCADE not valid;

alter table "public"."reports" validate constraint "reports_spot_id_fkey";

alter table "public"."reports" add constraint "reports_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."reports" validate constraint "reports_user_id_fkey";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "users_id_fkey";

alter table "public"."users" add constraint "users_username_key" UNIQUE using index "users_username_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'username');

  -- Insert into users table
  INSERT INTO public.users (id, username)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'username');

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_last_report_if_not_helpful()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Ensure the report is marked as not helpful
    IF NEW.flag_not_helpful THEN
        -- Update the last_report_id in the spots table to the most recent report that is still considered helpful
        UPDATE spots
        SET last_report_id = (
            SELECT id FROM reports 
            WHERE spot_id = NEW.spot_id AND flag_not_helpful = FALSE
            ORDER BY created_at DESC
            LIMIT 1
        ),
        updated_at = now()
        WHERE id = NEW.spot_id;
    END IF;

    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_timestamp()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$
;

grant delete on table "public"."favorite_spots" to "anon";

grant insert on table "public"."favorite_spots" to "anon";

grant references on table "public"."favorite_spots" to "anon";

grant select on table "public"."favorite_spots" to "anon";

grant trigger on table "public"."favorite_spots" to "anon";

grant truncate on table "public"."favorite_spots" to "anon";

grant update on table "public"."favorite_spots" to "anon";

grant delete on table "public"."favorite_spots" to "authenticated";

grant insert on table "public"."favorite_spots" to "authenticated";

grant references on table "public"."favorite_spots" to "authenticated";

grant select on table "public"."favorite_spots" to "authenticated";

grant trigger on table "public"."favorite_spots" to "authenticated";

grant truncate on table "public"."favorite_spots" to "authenticated";

grant update on table "public"."favorite_spots" to "authenticated";

grant delete on table "public"."favorite_spots" to "service_role";

grant insert on table "public"."favorite_spots" to "service_role";

grant references on table "public"."favorite_spots" to "service_role";

grant select on table "public"."favorite_spots" to "service_role";

grant trigger on table "public"."favorite_spots" to "service_role";

grant truncate on table "public"."favorite_spots" to "service_role";

grant update on table "public"."favorite_spots" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."report_feedback" to "anon";

grant insert on table "public"."report_feedback" to "anon";

grant references on table "public"."report_feedback" to "anon";

grant select on table "public"."report_feedback" to "anon";

grant trigger on table "public"."report_feedback" to "anon";

grant truncate on table "public"."report_feedback" to "anon";

grant update on table "public"."report_feedback" to "anon";

grant delete on table "public"."report_feedback" to "authenticated";

grant insert on table "public"."report_feedback" to "authenticated";

grant references on table "public"."report_feedback" to "authenticated";

grant select on table "public"."report_feedback" to "authenticated";

grant trigger on table "public"."report_feedback" to "authenticated";

grant truncate on table "public"."report_feedback" to "authenticated";

grant update on table "public"."report_feedback" to "authenticated";

grant delete on table "public"."report_feedback" to "service_role";

grant insert on table "public"."report_feedback" to "service_role";

grant references on table "public"."report_feedback" to "service_role";

grant select on table "public"."report_feedback" to "service_role";

grant trigger on table "public"."report_feedback" to "service_role";

grant truncate on table "public"."report_feedback" to "service_role";

grant update on table "public"."report_feedback" to "service_role";

grant delete on table "public"."reports" to "anon";

grant insert on table "public"."reports" to "anon";

grant references on table "public"."reports" to "anon";

grant select on table "public"."reports" to "anon";

grant trigger on table "public"."reports" to "anon";

grant truncate on table "public"."reports" to "anon";

grant update on table "public"."reports" to "anon";

grant delete on table "public"."reports" to "authenticated";

grant insert on table "public"."reports" to "authenticated";

grant references on table "public"."reports" to "authenticated";

grant select on table "public"."reports" to "authenticated";

grant trigger on table "public"."reports" to "authenticated";

grant truncate on table "public"."reports" to "authenticated";

grant update on table "public"."reports" to "authenticated";

grant delete on table "public"."reports" to "service_role";

grant insert on table "public"."reports" to "service_role";

grant references on table "public"."reports" to "service_role";

grant select on table "public"."reports" to "service_role";

grant trigger on table "public"."reports" to "service_role";

grant truncate on table "public"."reports" to "service_role";

grant update on table "public"."reports" to "service_role";

grant delete on table "public"."spots" to "anon";

grant insert on table "public"."spots" to "anon";

grant references on table "public"."spots" to "anon";

grant select on table "public"."spots" to "anon";

grant trigger on table "public"."spots" to "anon";

grant truncate on table "public"."spots" to "anon";

grant update on table "public"."spots" to "anon";

grant delete on table "public"."spots" to "authenticated";

grant insert on table "public"."spots" to "authenticated";

grant references on table "public"."spots" to "authenticated";

grant select on table "public"."spots" to "authenticated";

grant trigger on table "public"."spots" to "authenticated";

grant truncate on table "public"."spots" to "authenticated";

grant update on table "public"."spots" to "authenticated";

grant delete on table "public"."spots" to "service_role";

grant insert on table "public"."spots" to "service_role";

grant references on table "public"."spots" to "service_role";

grant select on table "public"."spots" to "service_role";

grant trigger on table "public"."spots" to "service_role";

grant truncate on table "public"."spots" to "service_role";

grant update on table "public"."spots" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

create policy "Public profiles are viewable by everyone."
on "public"."profiles"
as permissive
for select
to public
using (true);


create policy "Users can insert their own profile."
on "public"."profiles"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = id));


create policy "Users can update their own profile."
on "public"."profiles"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = id));


create policy "Users can update their own user data."
on "public"."users"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = id));


CREATE TRIGGER trigger_update_timestamp BEFORE UPDATE ON public.favorite_spots FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trigger_update_timestamp BEFORE UPDATE ON public.report_feedback FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trigger_update_last_report_if_not_helpful AFTER UPDATE OF flag_not_helpful ON public.reports FOR EACH ROW EXECUTE FUNCTION update_last_report_if_not_helpful();

CREATE TRIGGER trigger_update_timestamp BEFORE UPDATE ON public.reports FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trigger_update_timestamp BEFORE UPDATE ON public.spots FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trigger_update_timestamp BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_timestamp();


