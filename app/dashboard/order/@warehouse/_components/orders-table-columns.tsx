"use client"

import * as React from "react"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { type ColumnDef } from "@tanstack/react-table"
import { toast } from "sonner"

import { getErrorMessage } from "@/lib/handle-error"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"

import { updateOrder } from "../../_lib/actions"
import { getStatusIcon } from "../../_lib/utils"
import { DeleteOrdersDialog } from "./delete-orders-dialog"
import { UpdateOrderSheet } from "./update-order-sheet"
import { Order, ShippingInfo, User } from "@/types/index"
import { OrderStatus } from "@prisma/client"

export function getColumns(): ColumnDef<Order>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "user",
      header: () => "Customer",
      cell: ({ row }) => {
        const user = row.getValue("user") as User

        return (
          <>
            <div className="font-medium">{user.name}</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              {user.email}
            </div>
          </>
        )
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = Object.keys(OrderStatus).find(
          (status) => status === row.original.status
        )

        if (!status) return null

        const Icon = getStatusIcon(status)

        return (
          <div className="flex w-[6.25rem] items-center">
            <Icon
              className="mr-2 size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="capitalize">{status}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "order_date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Order Date" />
      ),
      cell: ({ cell }) => formatDate(cell.getValue() as Date),
    },
    {
      id:"address",
      accessorKey: "shippingInfo",
      header: () => "Address",
      cell: ({ cell }) => {
        const info = cell.getValue() as ShippingInfo;
        if(info === null) return "NOT PROVIDED";
        return (
          <>
            <div className="font-medium">{info?.addressLine1}</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              {info?.city}
            </div>
          </>
        );
      },
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = React.useTransition()
        const [showUpdateOrderSheet, setShowUpdateOrderSheet] =
          React.useState(false)
        const [showDeleteOrderDialog, setShowDeleteOrderDialog] =
          React.useState(false)

        return (
          <>
            <UpdateOrderSheet
              open={showUpdateOrderSheet}
              onOpenChange={setShowUpdateOrderSheet}
              order={row.original}
            />
            <DeleteOrdersDialog
              open={showDeleteOrderDialog}
              onOpenChange={setShowDeleteOrderDialog}
              orders={[row.original]}
              showTrigger={false}
              onSuccess={() => row.toggleSelected(false)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <DotsHorizontalIcon className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onSelect={() => setShowUpdateOrderSheet(true)}>
                  Edit
                </DropdownMenuItem>
                {/* <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                      value={row.original.label}
                      onValueChange={(value) => {
                        startUpdateTransition(() => {
                          toast.promise(
                            updateTask({
                              id: row.original.id,
                              label: value as Task["label"],
                            }),
                            {
                              loading: "Updating...",
                              success: "Label updated",
                              error: (err) => getErrorMessage(err),
                            }
                          )
                        })
                      }}
                    >
                      {tasks.label.enumValues.map((label) => (
                        <DropdownMenuRadioItem
                          key={label}
                          value={label}
                          className="capitalize"
                          disabled={isUpdatePending}
                        >
                          {label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setShowDeleteOrderDialog(true)}
                >
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )
      },
    },
  ]
}
