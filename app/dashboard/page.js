import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/auth';
import LogoutButton from '@/components/LogoutButton';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className='p-10'>
      <h1 className='text-4xl font-bold'>Dashboard</h1>

      <p className='mt-5'>Welcome {user.name}</p>

      <p>{user.email}</p>
      <LogoutButton />
    </div>
  );
}
