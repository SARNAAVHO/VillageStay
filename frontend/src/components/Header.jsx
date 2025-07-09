import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { getUserById } from "@/services/api";

const Header = () => {
  const location = useLocation();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user } = useUser();
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > lastScrollY && currentY > 50);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const fetchHostStatus = async () => {
      if (user) {
        try {
          const res = await getUserById(user.id);
          setIsHost(res?.is_host || false);
        } catch (err) {
          console.error("Failed to fetch user host status", err);
        }
      }
    };
    fetchHostStatus();
  }, [user]);

  const linkBase =
    "text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-600 hover:scale-110 transition-all border px-3 py-2 rounded-full align-middle";
  const activeLink =
    "text-green-600 dark:text-green-400 font-semibold scale-110 border-green-600 border-2";

  return (
    <header
      className={`w-full px-6 md:px-10 py-5 bg-white dark:bg-gray-900 sticky top-0 z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <a href="/">
          <img
            src="/logo.svg"
            alt="VillageStay Logo"
            className="h-10 w-48 object-contain rounded-lg"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex">
          <div className="mt-2 space-x-10 items-center text-md mr-64">
            <a
              href="/"
              className={`${linkBase} ${
                location.pathname === "/" ? activeLink : ""
              }`}
            >
              Home
            </a>

            <a
              href="/becomehost"
              className={`${linkBase} ${
                location.pathname === "/becomehost" ? activeLink : ""
              }`}
            >
              Become a Host
            </a>

            {isHost && (
              <a
                href="/yourlistings"
                className={`${linkBase} ${
                  location.pathname === "/yourlistings" ? activeLink : ""
                }`}
              >
                Your Listings
              </a>
            )}

            <a
              href="/about"
              className={`${linkBase} ${
                location.pathname === "/about" ? activeLink : ""
              }`}
            >
              About
            </a>
          </div>

          <div className="flex gap-6">
            <ThemeToggle />
            {user ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <Button className="bg-green-600 hover:bg-green-700 rounded-full text-md text-white shadow-lg">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </div>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-8 h-8" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white dark:bg-gray-900">
              <div className="flex flex-col gap-4 mt-10">
                <a
                  href="/"
                  className={`text-lg ${
                    location.pathname === "/"
                      ? "text-green-600 font-semibold"
                      : "text-gray-800 dark:text-gray-100"
                  }`}
                >
                  Home
                </a>

                <a
                  href="/becomehost"
                  className={`text-lg ${
                    location.pathname === "/becomehost"
                      ? "text-green-600 font-semibold"
                      : "text-gray-800 dark:text-gray-100"
                  }`}
                >
                  Become a Host
                </a>

                {isHost && (
                  <a
                    href="/yourlistings"
                    className={`text-lg ${
                      location.pathname === "/yourlistings"
                        ? "text-green-600 font-semibold"
                        : "text-gray-800 dark:text-gray-100"
                    }`}
                  >
                    Your Listings
                  </a>
                )}

                <a
                  href="/about"
                  className={`text-lg ${
                    location.pathname === "/about"
                      ? "text-green-600 font-semibold"
                      : "text-gray-800 dark:text-gray-100"
                  }`}
                >
                  About
                </a>

                {user ? (
                  <UserButton afterSignOutUrl="/" />
                ) : (
                  <SignInButton mode="modal">
                    <Button
                      variant="outline"
                      size="default"
                      className="bg-green-600 hover:bg-green-700 rounded-full text-md text-white shadow-lg"
                    >
                      Sign In
                    </Button>
                  </SignInButton>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
