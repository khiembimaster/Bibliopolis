
'use client'
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getBookOrder, getOrder, getShippingInfo } from '@/app/action';
import { formatDate } from 'date-fns';

export default function Page() {
  const router = useParams();
  const orderId = router.id as string;
  const [items, setItems] = useState<{ id: number, book: { id: number, image: string, name: string, price: number, quantity: number }, quantity: number }[]>([]);
  const [order, setOrder] = useState<NonNullable<any>>(null);
  const [shippingInfo, setShippingInfo] = useState<NonNullable<any>>(null);

  useEffect(() => {
    const fetchOrderBooks = async () => {
      try {
        const itemList = await getBookOrder(orderId);
        setItems(itemList);
      } catch (error) {
        console.error("Error fetching books in order:", error);
      }
    };

    if (orderId) {
      fetchOrderBooks();
    }
  }, [orderId]);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const order = await getOrder(orderId);
        setOrder(order);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);
  useEffect(() => {
    const fetchShip = async () => {
      try {
        const ship = await getShippingInfo(orderId);
        console.log(ship)
        setShippingInfo(ship);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    if (orderId) {
      fetchShip();
    }
  }, [orderId]);

  return (
    <div className='grid grid-cols-3 gap-10 ms-10 mt-10'>
      <div className='col-span-3'>
        <h1 className='text-4xl text-center '>Order detail</h1>
      </div>
      <div className='col-span-3 ms-10 me-10'>
        <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <h1 className='text-2xl font-bold'>Order ID: {orderId}</h1>
        <div className='flex gap-20 mt-5'>
          <div>
            <p className='font-bold'>Order date</p>
            <p> {String(order?.order_date.getDate())}-{String(order?.order_date.getMonth() + 1)}-{String(order?.order_date.getFullYear())}</p>
          </div>
          <div>
            <p className='font-bold'>Delivery date</p>
            <p> {String(shippingInfo?.updatedAt.getDate())}-{String(shippingInfo?.updatedAt.getMonth() + 1)}-{String(shippingInfo?.updatedAt.getFullYear())}</p>
          </div>
          <div>
              <p className='font-bold'>Shipping Address</p>
              <p>{String(shippingInfo?.addressLine1)} - {String(shippingInfo?.addressLine2)} - {String(shippingInfo?.city)} - {String(shippingInfo?.country)}</p>
            </div>
            <div>
              <p className='font-bold'>Contract</p>
              <p>{String(shippingInfo?.phone)}</p> 
              <p>{String(shippingInfo?.email)}</p> 
            </div>
            <div>
              <p className='font-bold'>Status</p>
              <p>{String(order?.status)}</p>
            </div>
        </div>
        <hr className="h-px mt-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      </div>
      <div className='col-start-1 col-span-2 ms-10'>
        <div className='flex gap-10 shadow-md'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="w-[280px]">Total price</TableHead>
                <TableHead className='w-[280px]'>Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className='flex gap-2 items-center'>
                    <div style={{ marginRight: '10px' }}>
                      <Image src={item.book.image} alt={item.book.name} width={100} height={100} />
                    </div>
                    <div className='font-medium'>
                      {item.book.name}
                    </div>
                  </TableCell>
                  <TableCell>${item.book.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className='col-start-3 mr-10'>
        <div className='shadow-md'>
          <h1 className=' font-bold text-4xl text-center'>Order Essentials</h1>
          <p className=' text-lg ms-5 mt-10'>Quantity items: {items.reduce((total, item) => total + item.quantity, 0)}</p>
          <p className=' text-lg ms-5 mt-5'>Total price: ${order?.total_price}</p>
        </div>
      </div>
    </div>
  );
}

