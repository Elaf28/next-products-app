'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });

    router.push('/login');
    router.refresh();
  }

  return (
    <button onClick={handleLogout} className='bg-red-500 text-white px-4 py-2 mt-5'>
      Logout
    </button>
  );
}
