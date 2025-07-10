import React, { useEffect, useState } from "react";
import { useUser, SignInButton, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { promoteUserToHost, getUserById } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function BecomeHost() {
  const { user, isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
  const checkOrPromoteUser = async () => {
    if (!user) return;

    try {
      // 🔁 Promote first (if not in DB, this will insert)
      await promoteUserToHost(user.id, user.fullName || "Unknown", user.primaryEmailAddress?.emailAddress);

      // ✅ Now safe to fetch user info
      const dbUser = await getUserById(user.id);
      if (dbUser?.is_host) {
        setIsHost(true);
      }
    } catch (err) {
      console.error("Failed to promote or fetch user:", err);
    } finally {
      setLoading(false);
    }
  };

  if (isSignedIn) {
    checkOrPromoteUser();
  } else {
    setLoading(false);
  }
}, [user, isSignedIn]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-white dark:bg-gray-900">
        <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <section className="min-h-[calc(100vh-160px)] flex items-center justify-center px-6 text-center bg-white dark:bg-gray-900">
        <div className="max-w-xl space-y-6">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Ready to become a host?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Earn income, share your culture, and welcome guests to your peaceful village home.
          </p>
          <SignInButton mode="modal">
            <Button size="custom" className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-full shadow-md">
              Sign In to list your stay
            </Button>
          </SignInButton>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-160px)] flex items-center justify-center px-6 bg-white dark:bg-gray-900">
      <div className="max-w-2xl space-y-6 text-center">
        <h2 className="text-4xl font-bold text-green-600">Welcome, Host!</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          You're now a verified host. Start listing your home and connect with travelers looking for authentic village experiences.
        </p>
        <Button
          size="custom"
          onClick={() => navigate("/CreateListings")}
          className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-full shadow-lg"
        >
          Create Your Listing
        </Button>
      </div>
    </section>
  );
}

export default BecomeHost;
