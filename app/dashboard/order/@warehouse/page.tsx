import { auth } from '@/auth';
import { Role } from '@prisma/client';
import React from 'react'
import { OrdersTable } from './_components/orders-table';
import { Shell } from '@/components/shell';
import { DateRangePicker } from '@/components/date-range-picker';
import { searchParamsSchema } from '../_lib/validations';
import { getOrders } from '../_lib/queries';
import { SearchParams } from '@/types/index';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';


export interface IndexPageProps {
  searchParams: SearchParams
}

const WarehouseOrderPage = async ({ searchParams }: IndexPageProps) => {
  const search = searchParamsSchema.parse(searchParams)
  const ordersPromise = getOrders(search)
  
  const session = await auth();
  
  if(session?.user?.role === Role.WAREHOUSE_STAFF ) {
    return (
      <Shell className="gap-2">
        {/**
         * The `DateRangePicker` component is used to render the date range picker UI.
         * It is used to filter the tasks based on the selected date range it was created at.
         * The business logic for filtering the tasks based on the selected date range is handled inside the component.
         */}
        <DateRangePicker
          triggerSize="sm"
          triggerClassName="ml-auto w-56 sm:w-60"
          align="end"
          dateRange={
            search.from && search.to
              ? { from: new Date(search.from), to: new Date(search.to) }
              : undefined
          }
        />
        <React.Suspense
          fallback={
            <DataTableSkeleton
              columnCount={5}
              searchableColumnCount={1}
              filterableColumnCount={2}
              cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
              shrinkZero
            />
          }
        >
          {/**
           * Passing promises and consuming them using React.use for triggering the suspense fallback.
           * @see https://react.dev/reference/react/use
           */}
          <OrdersTable ordersPromise={ordersPromise} />
        </React.Suspense>
      </Shell>
    ) 
  }

  return;
}

export default WarehouseOrderPage