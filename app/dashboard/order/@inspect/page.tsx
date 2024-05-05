import prisma from '@/client'
import { OrderDetailsCard } from '@/components/my_components/OrderDetailsCard'
import { get } from 'http'
import React from 'react'

interface Props {
  searchParams: {orderId: string}
}

const getOrderDetails = async (orderId: string) => {
  const order = await prisma.order.findUniqueOrThrow({
    where:{
      id: orderId 
    },
    include: {
      user: {
        select:{
          name: true,
          email: true,
        }
      },
      books: {
        select: {
          quantity: true,
          book: {
            select: {
              price: true,
              title: true,
            }
          }
        }
      },
      shippingInfo: true
    }
  })

  return order;
}

const Inspect = async ({searchParams: {orderId}}:Props) => {

  try{
    const order = await getOrderDetails(orderId); 
    return (
      <OrderDetailsCard order={order}/>
    )
  }catch {
    return (
      <h1>Order not exist</h1>
    )
  }
}

export default Inspect