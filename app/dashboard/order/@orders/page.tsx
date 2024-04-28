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
      user: {
        name: "khiem",
        email: "khiembi@123",
      },
      id: "string",
      userId: "string",
      order_date: Date.now(),
      total_price: 1.2,
      shipping_address: "string",
      billing_address: "string",
      status: "Pending"
    },
    {
      user: {
        name: "khiem",
        email: "khiembi@123",
      },
      id: "string",
      userId: "string",
      order_date: Date.now(),
      total_price: 1.2,
      shipping_address: "string",
      billing_address: "string",
      status: "Pending"
    },
    {
      user: {
        name: "khiem",
        email: "khiembi@123",
      },
      id: "string",
      userId: "string",
      order_date: Date.now(),
      total_price: 1.2,
      shipping_address: "string",
      billing_address: "string",
      status: "Pending"
    }

  ]

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Address</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              orders.map(order => {
                
                return (
                  
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="font-medium">{order.user.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {order.user.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{order.shipping_address}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant="secondary">
                          {order.status}
                        </Badge>
                      </TableCell>
                      {/* <TableCell className="hidden md:table-cell">{order.order_date.toDateString()}</TableCell> */}
                      <TableCell className="hidden md:table-cell">{order.order_date.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{order.total_price.toString()}</TableCell>
                    </TableRow>
                )
              })
            }
            

          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default OrderTable