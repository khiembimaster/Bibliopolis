import { OrderStatus } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"
import exp from "constants"


export interface SearchParams {
  [key: string]: string | string[] | undefined
}

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
  withCount?: boolean
}

export interface DataTableFilterField<TData> {
  label: string
  value: keyof TData
  placeholder?: string
  options?: Option[]
}

export interface DataTableFilterOption<TData> {
  id: string
  label: string
  value: keyof TData
  options: Option[]
  filterValues?: string[]
  filterOperator?: string
  isMulti?: boolean
}

// Order Result

export type ShippingInfo = {
  addressLine1: string,
  addressLine2: string | null,
  city: string,
  state: string,
  updatedAt: Date,
  deliveryMethod: string,
  trackingNumber: string | null
}

export type User = {
  name: string | null,
  email: string | null,
}

export type Order = {
  id: string,
  user: User,
  shippingInfo?: ShippingInfo | null
  status: OrderStatus,
  order_date: Date
  total_price: Decimal
}

// export type DrizzleWhere<T> =
//   | SQL<unknown>
//   | ((aliases: T) => SQL<T> | undefined)
//   | undefined
