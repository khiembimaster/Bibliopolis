"use client"

import * as React from "react"
import { OrderStatus } from "@prisma/client"
import type { DataTableFilterField, Order } from "@/types/index"

import { useDataTable } from "@/hooks/use-data-table"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"

import type { getOrders } from "../_lib/queries"
import { getStatusIcon } from "../_lib/utils"
import { getColumns } from "./orders-table-columns"
import { OrdersTableFloatingBar } from "./orders-table-floating-bar"
import { OrdersTableToolbarActions } from "./orders-table-toolbar-actions"

interface OrdersTableProps {
  ordersPromise: ReturnType<typeof getOrders>
}

export function OrdersTable({ ordersPromise }: OrdersTableProps) {

  const { data, pageCount } = React.use(ordersPromise)

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), [])

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  const filterFields: DataTableFilterField<Order>[] = [
    // {
    //   label: "Customer email",
    //   value: "email",
    //   placeholder: "Filter titles...",
    // },
    {
      label: "Status",
      value: "status",
      options: Object.keys(OrderStatus).map((status) => ({
        label: status[0]?.toUpperCase() + status.slice(1),
        value: status,
        icon: getStatusIcon(status),
        withCount: true,
      })),
    },
  ]

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    // optional props
    filterFields,
    enableAdvancedFilter: true,
    defaultPerPage: 10,
    defaultSort: "order_date.desc",
  })

  return (
    <DataTable
      table={table}
      floatingBar={
        <OrdersTableFloatingBar table={table} />
      }
    >

      <DataTableToolbar table={table} filterFields={filterFields}>
        <OrdersTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  )
}
