'use client'; // This is a Client Component, as it uses React hooks (though not strictly necessary for this static content, it's good practice for consistency if other pages are client-side)

import React from 'react';
import Image from 'next/image'; // Importing Image from Next.js for optimized images

// Define a type for a Founder
interface Founder {
  id: number;
  name: string;
  url: string; // Optional: URL to the founder's profile or image
  // You can add more properties here if needed, e.g.:
  // role: string;
  // bio: string;
  // imageUrl: string;
}

// Array of founder data
const founders: Founder[] = [
  { id: 1, name: 'Alex Motor', url: "/alexm.jpg"},
  { id: 2, name: 'Alex Butler', url: "/alexb.jpg" },
  { id: 3, name: 'Jenil Bhayani', url: "/jenil.jpg" },
  { id: 4, name: 'Daniel Slobodnik', url: "/daniel.jpg" },
];

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 text-center">
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          Meet Our Founders
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          The brilliant minds behind our application.
        </p>

        {/* Founders Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {founders.map((founder) => (
            <div
              key={founder.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Optional: Founder Image Placeholder */}
              {/* You can replace this with an actual image later */}
              <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-700 flex items-center justify-center mb-4 overflow-hidden">
                {/* Placeholder for an actual image */}
                {/* <img src={founder.imageUrl} alt={founder.name} className="w-full h-full object-cover" /> */}
                {/* <span className="text-4xl font-bold text-blue-600 dark:text-blue-200">
                  {founder.name.charAt(0)}
                </span> */}
                <Image
                  src={founder.url}
                  alt={founder.name}
                  width={96}
                  height={96}>
                </Image>
              </div>

              {/* Founder Name */}
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {founder.name}
              </h2>

              {/* Optional: Founder Role/Description */}
              {/* {founder.role && (
                <p className="text-md text-gray-500 dark:text-gray-400">
                  {founder.role}
                </p>
              )}
              {founder.bio && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 text-center">
                  {founder.bio}
                </p>
              )} */}
            </div>
          ))}
        </div>

        {/* Footer/Back to Home (Optional) */}
        <p className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          Thank you for being a part of our journey!
        </p>
        {/* You could add a link back to the main app here */}
        {/* <a href="/" className="mt-4 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
          Back to Application
        </a> */}
      </div>
    </div>
  );
}