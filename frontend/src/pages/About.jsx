import React from 'react';

function About() {
  return (
    <div className="min-h-screen px-6 py-14 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-amber-600">About VillageStay</h1>
        
        <p className="text-lg md:text-xl leading-relaxed text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          At <span className="font-semibold text-amber-700 dark:text-amber-400">VillageStay</span>, we connect travelers with authentic rural stays across India. 
          Whether you're looking to escape the city noise, immerse in local cultures, or simply unwind in nature, our platform helps you find peaceful homes nestled in serene villages.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-amber-600 mb-3">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
              We aim to promote sustainable tourism by empowering local communities. Each listing on our platform is hosted by villagers who open their homes to share their traditions, cuisine, and way of life.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-600 mb-3">Why VillageStay?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-base md:text-lg">
              <li>Direct booking with local hosts</li>
              <li>Experience authentic Indian village life</li>
              <li>No middlemen — fair and transparent</li>
              <li>Preserve heritage through cultural tourism</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 text-center">
          <h2 className="text-2xl font-bold text-amber-600 mb-3">Join the Journey</h2>
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Be part of a movement that celebrates slow travel, conscious choices, and deep connections. Discover villages you never knew existed — and stories you'll never forget.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
