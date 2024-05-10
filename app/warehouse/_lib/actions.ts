"use server"

import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { customAlphabet } from "nanoid"

import { getErrorMessage } from "@/lib/handle-error"

import type { CreateOrderSchema, UpdateOrderSchema } from "./validations"
import { OrderStatus } from "@prisma/client"

export async function createOrder(
  input: CreateOrderSchema
) {
  noStore()
  try {
    await Promise.all([
      
    ])

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

export async function updateOrder(input: UpdateOrderSchema & { id: string }) {
  noStore()
  try {
    // await db
    //   .update(Orders)
    //   .set({
    //     title: input.title,
    //     label: input.label,
    //     status: input.status,
    //     priority: input.priority,
    //   })
    //   .where(eq(Orders.id, input.id))

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
  label?: string
  status?: OrderStatus
}) {
  noStore()
  try {
    // await db
    //   .update(Orders)
    //   .set({
    //     label: input.label,
    //     status: input.status,
    //     priority: input.priority,
    //   })
    //   .where(inArray(Orders.id, input.ids))

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
    // await db.delete(Orders).where(eq(Orders.id, input.id))

    // // Create a new Order for the deleted one
    // await seedOrders({ count: 1 })

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
    // await db.delete(Orders).where(inArray(Orders.id, input.ids))

    revalidatePath("/")

    // Create new Orders for the deleted ones
    // await seedOrders({ count: input.ids.length })

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
