import { OrderDetailsCard } from '@/components/my_components/OrderDetailsCard'
import { SkeletonCard } from '@/components/my_components/SkeletonCard'
import { SearchParams } from '@/types/index'
import React from 'react'
import { searchParamsSchema } from '../_lib/validations'
import { getOrderDetails } from '../_lib/queries'

export interface Props {
  searchParams: SearchParams
}

const Inspect = async ({searchParams}:Props) => {
  const search = searchParamsSchema.parse(searchParams)
  
  try{
    const order = await getOrderDetails(search.orderId); 
    return (
      <OrderDetailsCard order={order}/>
    )
  }catch {
    return (
      <SkeletonCard/>
    )
  }
}

export default Inspect