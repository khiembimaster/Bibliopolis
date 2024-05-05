"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { Decimal } from "@prisma/client/runtime/library"

export type User = {
  name: string | null,
  email: string | null,
}

export type Order = {
  id: string,
  user: User,
  status: string,
  order_date: Date
  total_price: Decimal
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order", 
    cell: ({row}) => {
      const id = row.getValue("id") as string
      return <div className="font-medium">{id}</div>
    }
  },
  {
    accessorKey: "user",
    header: () => "User", 
    cell: ({row}) => {
      const user = row.getValue("user") as User
      return(
        <>
          <div className="font-medium">{user.name}</div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {user.email}
          </div>
        </>
      )
    }
  },
  {
    accessorKey: "status",
    header: () => <div className="hidden sm:table-cell">Status</div>,
    cell: ({row}) => {
      const status = row.getValue("status") as string
      return <Badge className="text-xs" variant="outline">{status}</Badge>
    }
  },
  {
    accessorKey: "order_date",
    header:() =>  <div className="hidden md:table-cell">Date</div>, 
    cell: ({row}) => {
      const date = row.getValue("order_date") as Date
      return <div className="font-medium">{date.toLocaleDateString()}</div>
    }
  },
  {
    accessorKey: "total_price",
    header:() =>  <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: function Action({ row }){
      const router = useRouter();
      const order = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push(`order?orderId=${order.id}`)}
            >
              View order details
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

