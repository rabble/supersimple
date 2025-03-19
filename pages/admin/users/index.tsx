import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext';
import { isAdmin } from '../../../lib/admin';
import UserRoleManager from '../../../components/admin/UserRoleManager';

export default function UsersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  
  useEffect(() => {
    async function checkAdminStatus() {
      if (!user) {
        router.push('/auth/login');
        return;
      }
      
      try {
        const adminStatus = await isAdmin(user as any);
        setIsUserAdmin(adminStatus);
        
        if (!adminStatus) {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      } finally {
        setLoading(false);
      }
    }
    
    checkAdminStatus();
  }, [user, router]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!isUserAdmin) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <UserRoleManager />
    </div>
  );
}
