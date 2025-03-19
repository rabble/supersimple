import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuthProvider } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showHeader?: boolean;
  directoryId?: string;
  directoryName?: string;
}

export default function Layout({ 
  children, 
  title = 'SuperSimple.Directory', 
  description = 'A platform for creating and managing directories',
  showHeader = false,
  directoryId,
  directoryName
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {showHeader && directoryId && (
        <nav className="bg-gray-100 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h3 className="text-lg font-bold text-gray-800">
                    {directoryName || 'Directory'}
                  </h3>
                </div>
              </div>
              <div className="flex items-center">
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link href={`/directories/${directoryId}/listings`} className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                    Organizations
                  </Link>
                  <Link href="/about" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                    About
                  </Link>
                  <Link href="/contact" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
      
      <main>{children}</main>
      
      {showHeader && (
        <footer className="bg-gray-100 border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">Directory</h3>
                <ul className="space-y-2">
                  {directoryId && (
                    <>
                      <li>
                        <Link href={`/directories/${directoryId}`} className="text-gray-600 hover:text-indigo-600">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link href={`/directories/${directoryId}/listings`} className="text-gray-600 hover:text-indigo-600">
                          Browse Listings
                        </Link>
                      </li>
                      <li>
                        <Link href={`/directories/${directoryId}/submit`} className="text-gray-600 hover:text-indigo-600">
                          Add Listing
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">About</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-gray-600 hover:text-indigo-600">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-600 hover:text-indigo-600">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/comparisons" className="text-gray-600 hover:text-indigo-600">
                      Comparisons
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/terms" className="text-gray-600 hover:text-indigo-600">
                      Terms of Use
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-gray-600 hover:text-indigo-600">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500">© {new Date().getFullYear()} SuperSimple.Directory. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
