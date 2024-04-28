import ProductList from '@/components/Pages/products/productList'
import React from 'react'

export default function page() {
  return (
    <div className='container my-14'>
        <h1 className='text-2xl font-semibold mc-8'>Product All</h1>
        <ProductList/>
    </div>
  )
}
