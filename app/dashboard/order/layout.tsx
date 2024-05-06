import Link from 'next/link'
import React, { ReactNode } from 'react'

const OrderLayout = ({
  children, 
  inspect, 
  list
}: {
  children: React.ReactNode, 
  inspect: React.ReactNode,
  list: React.ReactNode
}) => {
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