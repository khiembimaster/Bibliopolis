import { auth } from '@/auth';
import { Role } from '@prisma/client';
import React from 'react'
import { Dashboard } from './Dashboard';

const OrderManagement = async () => {
  const session = await auth();
  
  if(session?.user?.role === Role.WAREHOUSE_STAFF ) {
    // session.user.id
    return <Dashboard/> 
  }
  // return <Button>You are not authorized to view this page!</Button>;
  return;
}

export default OrderManagement