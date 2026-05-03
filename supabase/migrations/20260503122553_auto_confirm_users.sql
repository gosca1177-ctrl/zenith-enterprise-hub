/*
  # Auto-confirm new users on signup

  1. Changes
    - Creates a trigger function that automatically confirms new users
      by setting email_confirmed_at to now() when a new user is inserted
      into auth.users
    - Adds a trigger on auth.users that fires AFTER INSERT

  2. Security
    - This function runs with SECURITY DEFINER as the postgres superuser
      because regular users cannot modify auth.users
    - Only affects newly created users (INSERT trigger)

  3. Purpose
    - Disables the email confirmation requirement by auto-confirming
      users immediately upon signup, so they get a session right away
*/

CREATE OR REPLACE FUNCTION public.auto_confirm_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE auth.users
  SET email_confirmed_at = now(),
      confirmed_at = now()
  WHERE id = NEW.id
    AND email_confirmed_at IS NULL;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_confirm_new_user();