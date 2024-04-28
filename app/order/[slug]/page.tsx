
import prisma from '@/client'
import { OrderDetailsCard } from '@/components/my_components/OrderDetailsCard'
import React from 'react'

interface Props {
  params: { slug: string }
}

const OrderDetailsPage = async ({ params }: Props) => {
  const order = await prisma.order.findUniqueOrThrow({
    include:{
      user: {
        select: {
          name: true,
          email: true,
        }
      },
      books: {
        select: {
          quantity: true,
          book: {
            select:{
              price: true,
              title: true,
            }
          },
        }
      },
      shippingInfo: true
    },
    where: {
      id: params.slug
    },
  })

  return (<OrderDetailsCard order={order}/>)
}

export default OrderDetailsPage