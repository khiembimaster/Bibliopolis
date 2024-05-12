"use server"

import { unstable_noStore as noStore, revalidatePath } from "next/cache"

import { getErrorMessage } from "@/lib/handle-error"

import type { UpdateOrderSchema } from "./validations"
import { OrderStatus } from "@prisma/client"
import prisma from "@/client"

// export async function createOrder(
//   input: CreateOrderSchema
// ) {
//   noStore()
//   try {
//     await Promise.all([
      
//     ])

//     revalidatePath("/")

//     return {
//       data: null,
//       error: null,
//     }
//   } catch (err) {
//     return {
//       data: null,
//       error: getErrorMessage(err),
//     }
//   }
// }

export async function updateOrder(input: UpdateOrderSchema & { id: string }) {
  noStore()
  try {
    await prisma.order.update({
      where: {id: input.id},
      data: {
        status: input.status,
        shippingInfo: {
          update: {
            updatedAt: input.estimated_deliver_date,
          }
        }
      }
    })

    revalidatePath("/")

    return {
      data: null,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}

export async function updateOrders(input: {
  ids: string[]
  status?: OrderStatus
  order_date?: Date
}) {
  noStore()
  try {
    await prisma.order.updateMany({
      where: {
        id: {
          in: input.ids,
        },
      },
      data: {
        status: input.status,
        order_date: input.order_date,
      }
    })

    revalidatePath("/")

    return {
      data: null,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}

export async function deleteOrder(input: { id: string }) {
  try {
    await prisma.order.delete({
      where:{
        id: input.id
      }
    })

    revalidatePath("/")
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}

export async function deleteOrders(input: { ids: string[] }) {
  try {
    await prisma.order.deleteMany({
      where:{
        id: {
          in: input.ids
        }
      }
    })

    revalidatePath("/")

    return {
      data: null,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}
