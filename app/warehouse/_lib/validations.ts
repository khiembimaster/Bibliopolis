import { OrderStatus } from "@prisma/client"
import * as z from "zod"

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  title: z.string().optional(),
  status: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
})

export const getOrdersSchema = searchParamsSchema

export type GetOrdersSchema = z.infer<typeof getOrdersSchema>

export const createOrderSchema = z.object({
  status: z.nativeEnum(OrderStatus),
})

export type CreateOrderSchema = z.infer<typeof createOrderSchema>

export const updateOrderSchema = z.object({
  status: z.nativeEnum(OrderStatus).optional(),
})

export type UpdateOrderSchema = z.infer<typeof updateOrderSchema>
