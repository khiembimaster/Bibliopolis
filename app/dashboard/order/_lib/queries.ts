import "server-only"

import { unstable_noStore as noStore } from "next/cache"

import { type GetOrdersSchema } from "./validations"
import { Order } from "@/types/index"
import prisma from "@/client"
import { OrderStatus } from "@prisma/client"

export async function getOrderDetails (orderId: string | undefined){
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

export async function getOrders(input: GetOrdersSchema) {
  noStore()
  const { page, per_page, sort, status, min, max, from, to} =
    input

  try {
    // Offset to paginate the results
    const offset = (page - 1) * per_page
    // Column and order to sort by
    // Spliting the sort string by "." to get the column and order
    // Example: "title.desc" => ["title", "desc"]
    const [column, order] = (sort?.split(".").filter(Boolean) ?? [
      "order_date",
      "desc",
    ]) as [keyof Order | undefined, "asc" | "desc" | undefined]

    const statuses = status?.split(".") as OrderStatus[]
  
    // Convert the date strings to Date objects
    const fromDay = from ? new Date(from) : undefined
    const toDay = to ? new Date(to) : undefined

    // Transaction is used to ensure both queries are executed in a single transaction
    const [data, total] = await prisma.$transaction([
      prisma.order.findMany({
        where:{
          status: {
            in: statuses
          } ,
          total_price: {
            gte: min,
            lte: max
          },
          order_date: {
            gte: fromDay,
            lte: toDay,
          },
        },
        select:{
          id:true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          shippingInfo: {
            select: {
              addressLine1: true,
              addressLine2: true,
              city: true,
              state: true,
              deliveryMethod: true,
              trackingNumber: true
            }
          },
          status: true,
          order_date: true,
          total_price: true
        },
        orderBy:{
          [column as string]: order,
        },
        skip: offset,
        take: per_page
      }),
      prisma.order.count({
        where:{
          status: {
            in: statuses
          },
          total_price: {
            gte: min,
            lte: max
          },
          order_date: {
            gte: fromDay,
            lte: toDay,
          },
        },
      })
    ])


    const pageCount = Math.ceil(total / per_page)
    return { data, pageCount }
  } catch (err) {
    return { data: [], pageCount: 0 }
  }
}

export async function getUnApprovedOrders(input: GetOrdersSchema) {
  noStore()
  const { page, per_page, sort, status, min, max, from, to} =
    input

  try {
    // Offset to paginate the results
    const offset = (page - 1) * per_page
    // Column and order to sort by
    // Spliting the sort string by "." to get the column and order
    // Example: "title.desc" => ["title", "desc"]
    const [column, order] = (sort?.split(".").filter(Boolean) ?? [
      "order_date",
      "desc",
    ]) as [keyof Order | undefined, "asc" | "desc" | undefined]

    // Convert the date strings to Date objects
    const fromDay = from ? new Date(from) : undefined
    const toDay = to ? new Date(to) : undefined

    const statuses = status?.split(".") as OrderStatus[];
    const allowedStatus = [OrderStatus.UNAPPROVED, OrderStatus.APPROVED, OrderStatus.IN_CANCEL, OrderStatus.CANCELLED] as OrderStatus[];
    const filteredArray = status ? statuses.filter(value => allowedStatus.includes(value)) : allowedStatus;

    // Transaction is used to ensure both queries are executed in a single transaction
    const [data, total] = await prisma.$transaction([
      prisma.order.findMany({
        where:{
          status: {
            in: filteredArray,
          },
          total_price: {
            gte: min,
            lte: max
          },
          order_date: {
            gte: fromDay,
            lte: toDay,
          },
        },
        select:{
          id:true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          shippingInfo: {
            select: {
              addressLine1: true,
              addressLine2: true,
              city: true,
              state: true,
              deliveryMethod: true,
              trackingNumber: true
            }
          },
          status: true,
          order_date: true,
          total_price: true
        },
        orderBy:{
          [column as string]: order,
        },
        skip: offset,
        take: per_page
      }),
      prisma.order.count({
        where:{
          status: {
            in: filteredArray
          },
          total_price: {
            gte: min,
            lte: max
          },
          order_date: {
            gte: fromDay,
            lte: toDay,
          },
        },
      })
    ])


    const pageCount = Math.ceil(total / per_page)
    return { data, pageCount }
  } catch (err) {
    return { data: [], pageCount: 0 }
  }
}

export async function getOrderCountByStatus() {
  noStore()
  try {
    return await prisma.order.groupBy({
      by: ['status'],
      _count: {
        status: true
      },
      orderBy: {
        _count: {
          status: 'desc',
        },
      },
    })
  } catch (err) {
    return []
  }
}
