import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Ankita Gurung. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
