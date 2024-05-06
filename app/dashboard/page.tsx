import { auth } from '@/auth';
import React from 'react'
import { Role } from '@prisma/client';

const Page = async () => {
  const session = await auth();
  if(session?.user?.role === Role.WAREHOUSE_STAFF ) {
    return (
      <>
        <div>Page</div>
        <div>Page</div>
        <div>Page</div>
      </>
    )
  }
}

export default Page