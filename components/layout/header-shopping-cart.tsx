import Link from 'next/link'
import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'

export default function HeaderShoppingCart() {
  return (
    <>
    <Link href={'/cart'}><AiOutlineShoppingCart className={'w-8 h-8'}/></Link>
      
    </>
  )
}
