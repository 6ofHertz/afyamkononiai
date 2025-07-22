-- Create RLS policies for admin access to all profiles
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles admin_profile 
    WHERE admin_profile.id = auth.uid() 
    AND admin_profile.user_role = 'admin'
  )
);

CREATE POLICY "Admins can update all profiles" 
ON public.profiles 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles admin_profile 
    WHERE admin_profile.id = auth.uid() 
    AND admin_profile.user_role = 'admin'
  )
);

CREATE POLICY "Admins can insert profiles" 
ON public.profiles 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles admin_profile 
    WHERE admin_profile.id = auth.uid() 
    AND admin_profile.user_role = 'admin'
  )
);

-- Create a function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS(
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND user_role = 'admin'
  );
$$;

-- Create a test admin user if none exists
DO $$
BEGIN
  -- Insert a test admin profile only if no admin exists
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_role = 'admin') THEN
    INSERT INTO public.profiles (
      id, 
      first_name, 
      last_name, 
      user_role, 
      is_active
    ) VALUES (
      gen_random_uuid(),
      'Admin',
      'User',
      'admin',
      true
    );
  END IF;
END $$;