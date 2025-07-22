
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

interface RequireAuthProps {
  children: ReactNode;
  requiredRole?: 'patient' | 'doctor' | 'admin'; // Add optional requiredRole prop
}

const RequireAuth = ({ children, requiredRole }: RequireAuthProps) => {
  const { user, loading, profile } = useAuth(); // Get profile from useAuth
  const navigate = useNavigate();

  useEffect(() => {
    console.log('RequireAuth: Checking authentication and role...');
    if (!loading) {
      if (!user) {
        console.log('RequireAuth: User not logged in. Redirecting to /login');
        // If authentication is complete (not loading) and user is null, redirect to login
        navigate("/login", { replace: true });
      } else if (requiredRole) {
        console.log(`RequireAuth: User logged in. Checking for role: ${requiredRole}`);
        // If a requiredRole is specified, check if the user has that role
        if (!profile || profile.user_role !== requiredRole) {
          console.log(`RequireAuth: User role is ${profile?.user_role}. Required role is ${requiredRole}. Redirecting to /not-found`);
          // User logged in but doesn't have the required role, redirect
          // You might want a specific unauthorized page instead of NotFound
          navigate("/not-found", { replace: true });
        } else {
           console.log(`RequireAuth: User has required role: ${requiredRole}. Access granted.`);
        }
      } else {
        console.log('RequireAuth: User logged in, no specific role required. Access granted.');
      }
    }
  }, [user, loading, navigate, requiredRole, profile]); // Added requiredRole and profile to dependencies

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  // If user is authenticated and has the required role (if specified), render the children
  // If requiredRole is specified, only render if profile exists and matches the role
  const hasRequiredRole = requiredRole ? (profile && profile.user_role === requiredRole) : true;

  return user && hasRequiredRole ? <>{children}</> : null;
};

export default RequireAuth;
