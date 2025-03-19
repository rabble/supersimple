import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import DirectoryWizard from '../../components/admin/DirectoryWizard';
import { useAuth } from '../../context/AuthContext';

export default function CreateDirectoryPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    
    setLoading(false);
  }, [user, router]);

  if (loading) {
    return (
      <Layout title="Create Directory" description="Create a new directory">
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Create Directory" description="Create a new directory">
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create New Directory</h1>
            <p className="mt-2 text-gray-600">
              Follow the steps below to create your own directory.
            </p>
          </div>
          <DirectoryWizard />
        </div>
      </div>
    </Layout>
  );
}
