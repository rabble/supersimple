import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext';
import DirectoryWizard from '../../../components/admin/DirectoryWizard';

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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8">
      <DirectoryWizard />
    </div>
  );
}
