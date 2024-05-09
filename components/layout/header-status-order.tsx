import Link from 'next/link'
import React from 'react'
import { AiFillShopping } from 'react-icons/ai'

export default function Headerstatusorder() {
  return (
    <>
    <Link href={'/status-order'}><AiFillShopping  className={'w-8 h-8'}/></Link>
      
    </>
  )
}
