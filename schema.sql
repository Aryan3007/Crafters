-- Create an enum for user roles
create type user_role as enum ('admin', 'client');

-- Create a table for user profiles
create table public.profiles (
  id uuid references auth.users(id) primary key,
  role user_role default 'client',
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a table for projects
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  status text default 'planning',
  progress integer default 0,
  client_id uuid references public.profiles(id),
  start_date timestamp with time zone default timezone('utc'::text, now()),
  due_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a junction table for team members on projects
create table public.project_members (
  user_id uuid references public.profiles(id),
  project_id uuid references public.projects(id),
  role text default 'member',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, project_id)
);

-- Function to handle new user profiles
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture'),
    case
      when new.email like '%@creativestudio.com' then 'admin'::user_role
      else 'client'::user_role
    end
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to automatically create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

