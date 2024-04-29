import prisma from "@/client"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTable } from "./data-table"
import { columns } from "./columns"

const flattenData = () => {

}

const OrderTable = async () => {
  // const orders = await prisma.order.findMany({
  //   include: {
  //     user: {
  //       select: {
  //         name: true,
  //         email: true,
  //       },
  //     },
  //   }
  // });

  const orders = [
    {
      id: "1",
      name: "khiem",
      email: "khiembi@123",
      status: "Pending",
      date: "25-1-2003",
      amount: 1.2,
    },
    {
      id: "2",
      name: "khiem",
      email: "khiembi@123",
      status: "Pending",
      date: "25-1-2003",
      amount: 1.2,
    },
  ]

  return (
    <DataTable columns={columns} data={orders} />
  )
}

export default OrderTable