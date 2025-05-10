import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/hooks/use-theme";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background/90 backdrop-blur-md sticky top-0 z-50 border-b border-border">
      <div className="container max-w-screen-xl flex flex-wrap items-center justify-between py-3 px-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">AfyaMkononi</span>
        </Link>

        {/* Mobile menu button */}
        <button onClick={toggleMobileMenu} data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-muted-foreground rounded-lg md:hidden hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring" aria-controls="mobile-menu" aria-expanded={isMenuOpen}>
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>

        <div className={`w-full md:block md:w-auto ${isMenuOpen ? '' : 'hidden'}`} id="mobile-menu">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-border rounded-lg bg-background md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <Link to="/" className="block py-2 px-4 text-sm rounded md:bg-transparent hover:bg-secondary md:hover:bg-transparent" aria-current="page">Home</Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 px-4 text-sm rounded hover:bg-secondary md:hover:bg-transparent">About</Link>
            </li>
            <li>
              <Link to="/services" className="block py-2 px-4 text-sm rounded hover:bg-secondary md:hover:bg-transparent">Services</Link>
            </li>
             <li>
              <Link to="/doctors" className="block py-2 px-4 text-sm rounded hover:bg-secondary md:hover:bg-transparent">Doctors</Link>
            </li>
            <li>
              <Link to="/contact" className="block py-2 px-4 text-sm rounded hover:bg-secondary md:hover:bg-transparent">Contact</Link>
            </li>
            <li>
              <Link to="/ai-assistant" className="block py-2 px-4 text-sm rounded hover:bg-secondary md:hover:bg-transparent">AI Assistant</Link>
            </li>
            <li>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </li>
            {user ? (
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link to="/patient-dashboard">Dashboard</Link></DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="block py-2 px-4 text-sm rounded hover:bg-secondary md:hover:bg-transparent">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="block py-2 px-4 text-sm rounded hover:bg-secondary md:hover:bg-transparent">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
