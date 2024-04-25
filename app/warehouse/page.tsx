import { auth } from '@/auth';
import prisma from '@/client';
import { Button } from '@/components/ui/button';
import { Role } from '@prisma/client';
import React from 'react'

const OrderManagement = async () => {
  const session = await auth();
  
  if(session?.user?.role === Role.WAREHOUSE_STAFF ) {
    
    return <p>You are a warehouse-staff, welcome!</p>;
  }
  return <Button>You are not authorized to view this page!</Button>;
}

export default OrderManagement