import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BrowseStays() {
  const [listings, setListings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  /* ------------------------------------------------------------- */
  /* Fetch listings on mount                                        */
  /* ------------------------------------------------------------- */
  useEffect(() => {
    async function fetchListings() {
      try {
        const res = await fetch('/api/listings');
        const data = await res.json();

        /* Ensure each listing has at least one image — if not, fetch via DuckDuckGo helper */
        const withImages = await Promise.all(
          data.map(async (l) => {
            if (l.images && l.images.length) return l;

            /* No stored image → call backend helper */
            const imgRes = await fetch(`/api/image?q=${encodeURIComponent(l.location.village + ' homestay')}`);
            const { url } = await imgRes.json();
            return { ...l, images: [{ url, alt_text: `${l.location.village} stay`, position: 1 }] };
          })
        );

        setListings(withImages);
        setFiltered(withImages);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    fetchListings();
  }, []);

  /* ------------------------------------------------------------- */
  /* Filter by location name                                        */
  /* ------------------------------------------------------------- */
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setFiltered(listings);
    } else {
      setFiltered(
        listings.filter(
          (l) =>
            l.location.village.toLowerCase().includes(q) ||
            (l.location.state && l.location.state.toLowerCase().includes(q))
        )
      );
    }
  }, [query, listings]);

  /* ------------------------------------------------------------- */
  /* UI helpers                                                     */
  /* ------------------------------------------------------------- */
  const SkeletonCard = () => (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-72 rounded-xl"></div>
  );

  const StayCard = ({ stay }) => {
    const cover = stay.images[0]?.url || 'https://picsum.photos/seed/' + stay.id + '/600/400';

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition flex flex-col">
        <img
          src={cover}
          alt={stay.images[0]?.alt_text || stay.title}
          className="h-48 w-full object-cover rounded-t-xl"
        />
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{stay.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {stay.location.village}, {stay.location.state}
          </p>
          <span className="mt-2 inline-block bg-amber-100 text-amber-700 dark:bg-amber-700 dark:text-amber-100 px-2 py-1 rounded text-xs">
            Max guests: {stay.max_guests}
          </span>
          <Link
            to={`/listing/${stay.id}`}
            className="mt-auto inline-block text-center bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            View Details
          </Link>
        </div>
      </div>
    );
  };

  /* ------------------------------------------------------------- */
  /* Render                                                         */
  /* ------------------------------------------------------------- */
  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-amber-600 mb-8">
          Browse Stays
        </h1>

        {/* Search bar */}
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by village or state…"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-amber-500 focus:border-amber-500 outline-none"
          />
        </div>

        {/* Listings grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((stay) => (
              <StayCard key={stay.id} stay={stay} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600 dark:text-gray-400">No stays found.</p>
        )}
      </div>
    </div>
  );
}

export default BrowseStays;
