-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('patient', 'doctor', 'admin');

-- Create profiles table for storing user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  date_of_birth DATE,
  user_role public.user_role NOT NULL DEFAULT 'patient',
  employee_id TEXT UNIQUE, -- For doctors/staff
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    first_name, 
    last_name, 
    phone, 
    date_of_birth, 
    user_role
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    CASE 
      WHEN NEW.raw_user_meta_data->>'date_of_birth' IS NOT NULL 
      THEN (NEW.raw_user_meta_data->>'date_of_birth')::DATE
      ELSE NULL
    END,
    COALESCE((NEW.raw_user_meta_data->>'user_role')::public.user_role, 'patient'::public.user_role)
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS public.user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT user_role FROM public.profiles WHERE id = user_id;
$$;

-- Insert some sample doctors (can be managed by admin later)
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, role, aud, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'dr.smith@afyamkononi.com', crypt('doctor123', gen_salt('bf')), now(), '{"first_name": "John", "last_name": "Smith", "user_role": "doctor"}', 'authenticated', 'authenticated', now(), now()),
  (gen_random_uuid(), 'dr.johnson@afyamkononi.com', crypt('doctor123', gen_salt('bf')), now(), '{"first_name": "Mary", "last_name": "Johnson", "user_role": "doctor"}', 'authenticated', 'authenticated', now(), now())
ON CONFLICT (email) DO NOTHING;

-- Update profiles for sample doctors with employee IDs
UPDATE public.profiles 
SET employee_id = CASE 
  WHEN email = 'dr.smith@afyamkononi.com' THEN 'EMP001'
  WHEN email = 'dr.johnson@afyamkononi.com' THEN 'EMP002'
END,
user_role = 'doctor'
WHERE email IN ('dr.smith@afyamkononi.com', 'dr.johnson@afyamkononi.com');