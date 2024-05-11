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
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
        {children}
        {warehouse}
      </div>
    )
  }
    
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

export default OrderLayout