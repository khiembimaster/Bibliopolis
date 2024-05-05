'use client'
import React from 'react'
import Image from 'next/image';
import { Button } from '../ui/button';
import { Role } from '@prisma/client';
import { signIn,signOut, auth } from '@/auth';

// eslint-disable-next-line @next/next/no-async-client-component
export default async function SigninButton() {
  const session = await auth();
  if (session?.user?.role === Role.USER) {
    return (
      <div className="flex gap-4 ml-auto items-center">
        <p className="text-sky-600">{session.user.name}</p>
        <Button onClick={() => signOut} className="text-red-600">
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <Button onClick={() => signIn} className="text-green-600 ml-auto">
      Sign In
    </Button>
  )
}
