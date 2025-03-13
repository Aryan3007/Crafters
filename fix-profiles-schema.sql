-- Check if the profiles table exists and create it if it doesn't
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
        -- Create the user_role type if it doesn't exist
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
            CREATE TYPE user_role AS ENUM ('admin', 'client');
        END IF;

        -- Create the profiles table
        CREATE TABLE public.profiles (
            id UUID REFERENCES auth.users(id) PRIMARY KEY,
            role user_role DEFAULT 'client',
            full_name TEXT,
            avatar_url TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
        );

        -- Set RLS policies
        ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
        
        -- Create policy to allow users to view their own profile
        CREATE POLICY "Users can view their own profile" 
            ON public.profiles 
            FOR SELECT 
            USING (auth.uid() = id);
            
        -- Create policy to allow users to update their own profile
        CREATE POLICY "Users can update their own profile" 
            ON public.profiles 
            FOR UPDATE 
            USING (auth.uid() = id);
            
        -- Create policy to allow service role to manage all profiles
        CREATE POLICY "Service role can do all" 
            ON public.profiles 
            USING (auth.role() = 'service_role');
    END IF;
END
$$;

-- Grant necessary permissions
GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT ALL ON TABLE public.profiles TO service_role;

-- Drop the existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create a more robust function to handle new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
    new_role user_role;
BEGIN
    -- Determine role based on email domain
    IF new.email LIKE '%@creativestudio.com' THEN
        new_role := 'admin'::user_role;
    ELSE
        new_role := 'client'::user_role;
    END IF;

    -- Check if profile already exists to avoid unique constraint violations
    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = new.id) THEN
        -- Insert the new profile with minimal required fields
        INSERT INTO public.profiles (
            id,
            role,
            created_at,
            updated_at
        ) VALUES (
            new.id,
            new_role,
            now(),
            now()
        );
    END IF;

    -- Update the profile with metadata in a separate statement
    -- This avoids issues if the metadata is malformed
    BEGIN
        UPDATE public.profiles
        SET 
            full_name = COALESCE(
                new.raw_user_meta_data->>'full_name',
                new.raw_user_meta_data->>'name',
                new.raw_user_meta_data->'user_metadata'->>'full_name',
                new.raw_user_meta_data->'user_metadata'->>'name',
                'User ' || substr(new.id::text, 1, 8)
            ),
            avatar_url = COALESCE(
                new.raw_user_meta_data->>'avatar_url',
                new.raw_user_meta_data->>'picture',
                new.raw_user_meta_data->'user_metadata'->>'avatar_url',
                new.raw_user_meta_data->'user_metadata'->>'picture'
            ),
            updated_at = now()
        WHERE id = new.id;
    EXCEPTION WHEN OTHERS THEN
        -- Log error but continue
        RAISE LOG 'Error updating profile metadata: %', SQLERRM;
    END;
    
    RETURN new;
EXCEPTION
    WHEN OTHERS THEN
        -- Log error details to Supabase logs
        RAISE LOG 'Error in handle_new_user: %', SQLERRM;
        -- Still return new to allow the user creation to proceed
        RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

