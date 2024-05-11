import { auth } from '@/auth';
import { Role } from '@prisma/client';
import Link from 'next/link'
import React, { ReactNode } from 'react'

const OrderLayout = async({
  children, 
  inspect, 
  list,
  warehouse
}: {
  children: React.ReactNode, 
  inspect: React.ReactNode,
  list: React.ReactNode,
  warehouse: React.ReactNode
}) => {

  const session = await auth();

  if(session?.user.role === Role.WAREHOUSE_STAFF){
    return (
      <div className="grid auto-rows-max items-start lg:col-span-3">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Order Control Table 
        </h2>
        {warehouse}
      </div>  
    )
  }
  if(session?.user.role === Role.ADMIN){
    return (
      <>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          {children}
          {list}
        </div>
        <div>
          {inspect}
        </div>
      </>
    )
  }   
}

export default OrderLayout