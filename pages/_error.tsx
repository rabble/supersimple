import React from 'react';
import { NextPageContext } from 'next';
import Layout from '../components/Layout';

interface ErrorProps {
  statusCode: number | null;
  hasGetInitialPropsRun: boolean;
  err?: Error;
}

const Error = ({ statusCode, hasGetInitialPropsRun, err }: ErrorProps) => {
  return (
    <Layout title={`Error ${statusCode || ''}`} description="An error occurred">
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {statusCode
                ? `An error ${statusCode} occurred on server`
                : 'An error occurred on client'}
            </h2>
            {err && (
              <div className="mt-4 bg-gray-100 p-4 rounded-md">
                <p className="text-red-600 font-medium">{err.message}</p>
                {err.stack && (
                  <pre className="mt-2 text-sm text-gray-700 overflow-auto max-h-60">
                    {err.stack}
                  </pre>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Refresh Page
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Go to Home Page
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

Error.getInitialProps = async ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode ?? 500 : 404;
  return {
    statusCode,
    hasGetInitialPropsRun: true,
    err
  };
};

export default Error;
