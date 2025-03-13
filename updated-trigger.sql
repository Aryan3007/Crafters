-- Updated function to handle new user profiles with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  full_name_val TEXT;
  avatar_url_val TEXT;
  user_role user_role;
BEGIN
  -- Extract full name with fallbacks for different providers
  full_name_val := 
    COALESCE(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      new.raw_user_meta_data->'user_metadata'->>'full_name',
      new.raw_user_meta_data->'user_metadata'->>'name',
      'User ' || substr(new.id::text, 1, 8)
    );
  
  -- Extract avatar URL with fallbacks for different providers
  avatar_url_val := 
    COALESCE(
      new.raw_user_meta_data->>'avatar_url',
      new.raw_user_meta_data->>'picture',
      new.raw_user_meta_data->'user_metadata'->>'avatar_url',
      new.raw_user_meta_data->'user_metadata'->>'picture'
    );
  
  -- Determine role based on email domain
  IF new.email LIKE '%@creativestudio.com' THEN
    user_role := 'admin'::user_role;
  ELSE
    user_role := 'client'::user_role;
  END IF;
  
  -- Insert the new profile
  INSERT INTO public.profiles (
    id, 
    full_name, 
    avatar_url, 
    role,
    created_at,
    updated_at
  ) VALUES (
    new.id,
    full_name_val,
    avatar_url_val,
    user_role,
    now(),
    now()
  );
  
  RETURN new;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error details to Supabase logs
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    -- Still return new to allow the user creation to proceed
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

