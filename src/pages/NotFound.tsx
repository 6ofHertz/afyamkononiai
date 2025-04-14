
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import BackgroundSlideshow from "@/components/layout/BackgroundSlideshow";
import { notFoundImages } from "@/lib/slideshow-images";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <BackgroundSlideshow images={notFoundImages} overlay={true}>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg max-w-md">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-2xl text-muted-foreground mb-8">Oops! Page not found</p>
          <p className="mb-8 text-muted-foreground">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          <Button asChild size="lg">
            <Link to="/" className="flex items-center gap-2">
              <Home size={18} /> Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </BackgroundSlideshow>
  );
};

export default NotFound;
