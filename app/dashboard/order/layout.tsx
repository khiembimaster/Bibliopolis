import { auth } from '@/auth';
import { Badge } from '@/components/ui/badge';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
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
      <ResizablePanelGroup
        direction="horizontal"
        className="grid auto-rows-max lg:col-span-3"
      >
        <ResizablePanel defaultSize={80}>
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Order Control Table <Badge className='align-center'>Seller</Badge>
          </h2>
          {admin}
        </ResizablePanel>
        <ResizableHandle withHandle className='self-stretch'/>
        <ResizablePanel>
          <div className='m-8'>
            {inspect}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    )
  }   

  if(session?.user.role === Role.SALE) {
    return (
      <ResizablePanelGroup
        direction="horizontal"
        className="grid auto-rows-max lg:col-span-3"
      >
        <ResizablePanel defaultSize={80}>
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Order Control Table <Badge className='align-center'>Seller</Badge>
          </h2>
          {seller}
        </ResizablePanel>
        <ResizableHandle withHandle className='self-stretch'/>
        <ResizablePanel>
          <div className='m-8'>
            {inspect}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    )
  }
}

export default OrderLayout