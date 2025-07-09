import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { getUserById, fetchAllListings } from "@/services/api";

const YourListings = () => {
  const { user } = useUser();
  const [isHost, setIsHost] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostListings = async () => {
      if (!user) return;
      try {
        const userData = await getUserById(user.id);
        setIsHost(userData.is_host);

        if (userData.is_host) {
          const all = await fetchAllListings();
          const userListings = all.filter(l => l.host_id === user.id);
          setListings(userListings);
        }
      } catch (err) {
        console.error("Error loading listings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHostListings();
  }, [user]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!isHost) {
    return <div className="text-center mt-10 text-lg">You are not a host.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Listings</h1>
      {listings.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No listings from your side yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="border rounded-xl p-4 shadow-md bg-white dark:bg-gray-800"
            >
              <h2 className="text-xl font-semibold">{listing.title}</h2>
              <p className="text-gray-500">{listing.description}</p>
              <p className="text-green-600 font-medium mt-2">₹ {listing.base_price} / night</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourListings;
