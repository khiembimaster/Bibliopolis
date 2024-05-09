'use client'
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { findAllOrder } from '../action';
import { AiFillEye } from 'react-icons/ai';
import Link from 'next/link';

import { useSession } from 'next-auth/react';

interface Order {
    id: string;
    order_date: Date;
    total_price: number;
    status: string;
}


export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]); // Provide type for orders
    const {data: session, status} = useSession()
    useEffect(() => {
        fetchOrders(session?.user.id);
    }, [session?.user.id]);

    const fetchOrders = async (id: string) => {
        try {
            const ordersData = await findAllOrder(id);
            const convertedOrders = ordersData.map(order => ({
                ...order,
                total_price: Number(order.total_price)
            }));
            setOrders(convertedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <div className='grid gap-10 grid-cols-4 ms-10 mt-10'>
            <div className='col-span-4'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead >Create date</TableHead>
                            <TableHead className="w-[280px]">Total price</TableHead>
                            <TableHead className='w-[280px]'>Status</TableHead>
                            <TableHead className='text-left'>View</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell className="text-left" >{String(order.order_date)}</TableCell>
                                <TableCell className="w-[250px]">{order.total_price}</TableCell>
                                <TableCell className='w-[280px]'>{order.status}</TableCell>
                                <TableCell >
                                    <Link href={`/status-order/${order.id}`}>
                                        <AiFillEye className={'w-8 h-8'} />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}


