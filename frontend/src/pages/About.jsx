import React from 'react';

function About() {
  return (
    <div className="min-h-screen px-6 py-14 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* ------------------------------------------------------------------ */}
        {/*  Title & Intro  */}
        {/* ------------------------------------------------------------------ */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-amber-600">
          About VillageStay
        </h1>

        <p className="text-lg md:text-xl leading-relaxed text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          At <span className="font-semibold text-amber-700 dark:text-amber-400">VillageStay</span>,
          we connect travelers with authentic rural stays across India. Escape city noise, immerse in local
          cultures, and unwind in nature—directly hosted by the communities you visit.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* Mission & Why  */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-amber-600 mb-3">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
              We promote sustainable tourism by empowering local households. Each stay helps preserve
              heritage, creates fair income for hosts, and lets guests experience India’s diverse village life.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-600 mb-3">Why VillageStay?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-base md:text-lg">
              <li>Direct, commission‑free booking with hosts</li>
              <li>Authentic cultural immersion</li>
              <li>Transparent pricing—no hidden fees</li>
              <li>Support for rural development & heritage</li>
            </ul>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Meet the Team  */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-16">
          <h2 className="text-3xl font-extrabold text-center text-amber-600 mb-10">
            Meet the Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* --- Team Member 1 --- */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md flex flex-col items-center">
              <img
                src="https://source.unsplash.com/200x200/?person,portrait"
                alt="Founder avatar"
                className="w-28 h-28 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Sarnabho Pal</h3>
              <p className="text-amber-600 dark:text-amber-400">UI and Frontend Developer</p>
              
            </div>

            {/* --- Team Member 2 --- */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md flex flex-col items-center">
              <img
                src="https://source.unsplash.com/200x200/?woman,developer"
                alt="CTO avatar"
                className="w-28 h-28 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Swastik Khan</h3>
              <p className="text-amber-600 dark:text-amber-400">UI and Frontend Developer</p>
              
            </div>

            {/* --- Team Member 3 --- */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md flex flex-col items-center">
              <img
                src="https://source.unsplash.com/200x200/?traveler,photographer"
                alt="CMO avatar"
                className="w-28 h-28 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Shirsendu Roy</h3>
              <p className="text-amber-600 dark:text-amber-400">Backend Developer</p>
              
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Call‑to‑Action  */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-amber-600 mb-3">Join the Journey</h2>
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Be part of the movement that celebrates slow travel, conscious choices, and deep connections.
            Discover villages you never knew existed—and stories you'll never forget.
          </p>
          <button className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-semibold transition">
            Explore Stays
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
