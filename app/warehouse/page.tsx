import { auth } from '@/auth';
import { Role } from '@prisma/client';
import React from 'react'
import { OrdersTable } from './_components/orders-table';
import OrderTable from '../dashboard/order/@list/page';

const OrderManagement = async () => {
  const session = await auth();
  
  if(session?.user?.role === Role.WAREHOUSE_STAFF ) {
    // session.user.id
    return (
      <OrdersTable
      
      />
    ) 
  }
  // return <Button>You are not authorized to view this page!</Button>;
  return;
}

export default OrderManagement