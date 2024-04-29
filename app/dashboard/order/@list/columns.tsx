"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"

export type Order = {
  id: string,
  name: string,
  email: string,
  status: string,
  date: string
  amount: number
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "name",
    header: "Customer", 
    cell: ({row}) => {
      const customer = row.getValue("name") as string
      return <div className="font-medium">{customer}</div>
    }
  },
  {
    accessorKey: "email",
    header: () => "Email", 
    cell: ({row}) => {
      const email = row.getValue("email") as string
      return <div className="hidden text-sm text-muted-foreground md:inline">{email}</div>
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
    accessorKey: "date",
    header:() =>  <div className="hidden md:table-cell">Date</div>, 
    cell: ({row}) => {
      const date = row.getValue("date") as string
      return <div className="font-medium">{date}</div>
    }
  },
  {
    accessorKey: "amount",
    header:() =>  <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
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

