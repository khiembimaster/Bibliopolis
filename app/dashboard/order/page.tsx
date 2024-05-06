import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from '@/components/ui/card'
import { Progress } from "@/components/ui/progress"
import React from 'react'
import { Button } from "@/components/ui/button"
import prisma from '@/client'
import { Decimal } from '@prisma/client/runtime/library'

interface SaleInfo {
  current_total: number,
  delta: number
  direction: string
}

async function getDeltaSale(t1: Date, t2: Date) {
  const current = await prisma.order.aggregate({
    _sum: {
      total_price: true,
    },
    where: {
      order_date: {
        gte: t1
      }
    }
  })

  const last = await prisma.order.aggregate({
    _sum: {
      total_price: true,
    },
    where: {
      order_date: {
        gte: t2,
        lt: t1
      }
    }
  })

  var current_total = current._sum.total_price?.toNumber();
  current_total = current_total !== undefined ? current_total : 0;
  var last_total = last._sum.total_price?.toNumber();
  last_total = last_total !== undefined ? last_total : 0;
  const direction = current_total > last_total ? '+' : '-';
  const delta = (Math.abs(current_total - last_total) / last_total) * 100;
  return {current_total, delta, direction};
}

const OrderManagementPage = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const thisMonday = new Date(today.setDate(today.getDate() - (today.getDay() || 7) + 1));
  const lastMonday = new Date(thisMonday.getFullYear(), thisMonday.getMonth(), thisMonday.getDate()-7);
  const weekSaleInfo:SaleInfo = await getDeltaSale(thisMonday, lastMonday);

  const startOfThisMonth = new Date(today.setDate(1));
  const startOfLastMonth = new Date(startOfThisMonth.getFullYear(), startOfThisMonth.getMonth() - 1, 1);
  const monthSaleInfo:SaleInfo = await getDeltaSale(startOfThisMonth, startOfLastMonth);

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      <Card
        className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
      >
        <CardHeader className="pb-3">
          <CardTitle>Your Orders</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Introducing Our Dynamic Orders Dashboard for Seamless
            Management and Insightful Analysis.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>Create New Order</Button>
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>This Week</CardDescription>
          <CardTitle className="text-4xl">{weekSaleInfo.current_total}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
          {weekSaleInfo.direction}{weekSaleInfo.delta}% from last week
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={25} aria-label="25% increase" />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2">
        <CardHeader className="pb-2">
          <CardDescription>This Month</CardDescription>
          <CardTitle className="text-4xl">{monthSaleInfo.current_total}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            {monthSaleInfo.direction}{monthSaleInfo.delta}% from last month
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={12} aria-label="12% increase" />
        </CardFooter>
      </Card>
    </div>
  )
}

export default OrderManagementPage