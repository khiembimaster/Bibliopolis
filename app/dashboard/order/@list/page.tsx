import prisma from "@/client"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ListFilter, File } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const getOrders = async (deltaTime: Date)=>{
  const orders = await prisma.order.findMany({
    where: {
      order_date: {
        gte: deltaTime
      }
    },
    select: {
      id:true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      status: true,
      order_date: true,
      total_price: true
    }
  });
  return orders;
}

const OrderTable = async () => {
  const today = new Date();
  const monday = new Date(today.setDate(today.getDate() - (today.getDay() || 7) + 1));
  const this_week_orders = await getOrders(monday);

  const startOfThisMonth = new Date(today.setDate(0));
  const this_month_orders = await getOrders(startOfThisMonth);

  const startOfThisYear = new Date(today.setMonth(0, 0));
  const this_year_orders = await getOrders(startOfThisYear);


  return (
    <Tabs defaultValue="week">
    <div className="flex items-center">
      <TabsList>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
        <TabsTrigger value="year">Year</TabsTrigger>
      </TabsList>
      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1 text-sm"
            >
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>
              Fulfilled
            </DropdownMenuCheckboxItem>

          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          size="sm"
          variant="outline"
          className="h-7 gap-1 text-sm"
        >
          <File className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only">Export</span>
        </Button>
      </div>
    </div>
    <TabsContent value="week">
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            Recent orders from your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={this_week_orders} />
        </CardContent>
      </Card>
    </TabsContent>
    <TabsContent value="month">
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            Recent orders from your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={this_month_orders} />
        </CardContent>
      </Card>
    </TabsContent>
    <TabsContent value="year">
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            Recent orders from your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={this_year_orders} />
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
  )
}

export default OrderTable