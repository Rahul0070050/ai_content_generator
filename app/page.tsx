import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="font-sans text-gray-800 min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-gradient-to-br from-indigo-50 to-white shadow-lg w-full z-10 top-0">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">Scriptify</div>
          <div className="space-x-6">
            <a
              href="/dashboard"
              className="font-bold text-xl text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Dashboard
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pb-24">
        <div className="mx-auto bg-gradient-to-br from-indigo-50 to-white pt-20 transition-all duration-300 text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white mx-auto mb-6">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 animate-fade-in-down">
            Empower Your Words with Scriptify
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 leading-relaxed animate-fade-in-up">
            Unleash the power of AI to create captivating content effortlessly
          </p>
          <button className="bg-indigo-600 text-white font-semibold py-3 px-10 rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
            <Link href="/dashboard">Start Creating Now</Link>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 animate-fade-in">
            Why Scriptify Stands Out
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="relative bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                Lightning Fast
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Generate polished content in seconds, accelerating your workflow
                by 10x
              </p>
            </div>
            <div className="relative bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                Premium Quality
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Craft professional-grade content with precision and consistency
              </p>
            </div>
            <div className="relative bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                Fully Customizable
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Tailor every piece to your brand’s voice, style, and vision
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-50 to-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white mx-auto mb-6">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 animate-fade-in">
            Ready to Script Your Success?
          </h2>
          <p className="text-lg mb-8 text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Join a community of creators amplifying their impact with
            Scriptify’s AI
          </p>
          <button className="bg-indigo-600 text-white font-semibold py-3 px-10 rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
            <Link href="/dashboard">Try It Free</Link>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-indigo-50 to-white py-10 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="text-xl font-bold text-indigo-600">Scriptify</div>
            <p className="text-sm text-gray-600">© 2025 All Rights Reserved</p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
