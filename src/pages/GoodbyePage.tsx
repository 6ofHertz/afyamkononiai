import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar'; // Assuming you want a navbar
import Footer from '@/components/layout/Footer'; // Assuming you want a footer

const GoodbyePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}{/* Optional: Include Navbar if desired */}
      <main className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold mb-4">Goodbye!</h1>
          <p className="text-muted-foreground mb-6">We hope to see you again soon.</p>
          <Link to="/login" className="text-blue-600 hover:underline">Log In Again</Link>
        </div>
      </main>
      {/* <Footer /> */}{/* Optional: Include Footer if desired */}
    </div>
  );
};

export default GoodbyePage;
