import React, { ReactNode } from 'react'

const OrderLayout = ({
  children, 
  details, 
  orders
}: {
  children: React.ReactNode, 
  details: React.ReactNode,
  orders: React.ReactNode
}) => {
  return (
    <>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        {children}
        {orders}
      </div>
      <div>
        {details}
      </div>
    </>
  )
}

export default OrderLayout