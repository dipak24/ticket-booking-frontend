import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto text-center mt-8 pt-8 pb-4 text-sm">
      <p>
        © {new Date().getFullYear()} Ticket Booking System. All rights
        reserved.
      </p>
      <p className="mt-2 text-gray-500">
        Built with React, TypeScript, and Tailwind CSS.
      </p>
    </footer>
  );
};
