import { auth } from '@/auth';
import { Badge } from '@/components/ui/badge';
import { Role } from '@prisma/client';
import Link from 'next/link'
import React, { ReactNode } from 'react'

const OrderLayout = async({
  children, 
  inspect, 
  admin,
  warehouse,
  seller,
}: {
  children: React.ReactNode, 
  inspect: React.ReactNode,
  admin: React.ReactNode,
  warehouse: React.ReactNode,
  seller: React.ReactNode
}) => {

  const session = await auth();

  if(session?.user.role === Role.WAREHOUSE_STAFF){
    return (
      <div className="grid auto-rows-max items-start lg:col-span-3">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Order Control Table <Badge className='align-center'>Warehouse Staff</Badge>
        </h2>
        {warehouse}
      </div>  
    )
  }
  if(session?.user.role === Role.ADMIN){
    return (
      <>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Order Control Table <Badge className='align-center'>Admin</Badge>
          </h2>
          {admin}
        </div>
        <div>
          {inspect}
        </div>
      </>
    )
  }   

  if(session?.user.role === Role.SALE) {
    return (
      <div className="grid auto-rows-max items-start lg:col-span-3">
        <h2 className="scroll-m-20 pb-2 border-b text-3xl font-semibold tracking-tight first:mt-0">
          Order Control Table <Badge className='align-center'>Seller</Badge>
        </h2>
        {warehouse}
      </div>  
    )
  }
}

export default OrderLayout