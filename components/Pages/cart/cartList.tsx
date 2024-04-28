import React from 'react';
import Image from 'next/image';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { PiMinus, PiPlus, PiTrash } from 'react-icons/pi';

export default function CartList() {
    const items = [
        { id: 1, name: "Product 1", image: "/image/image1.jpg", quantity: 2, price: 10 },
        { id: 2, name: "Product 2", image: "/image/image2.jpg", quantity: 1, price: 20 },
        { id: 3, name: "Product 3", image: "/image/image3.jpg", quantity: 3, price: 15 }
    ];

    return (
        <div className='grid gap-10 grid-cols-4 ms-10 mt-10'>
            <div className='col-span-3'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead className='w-[250px]'>Quantity</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className='text-right'>Edit</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map(item => (
                            <TableRow key={item.id}>
                                <TableCell className='flex items-center gap-1'>
                                    <div style={{ marginRight: '10px' }}>
                                        <Image src={item.image} alt={item.name} width={100} height={100} />
                                    </div>
                                    <div className='font-medium'>
                                        {item.name}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='flex items-center gap-2'>
                                        <Button size={'icon'} variant={'secondary'}>
                                            <PiMinus />
                                        </Button>
                                        <input type="number" id="productQuantity" defaultValue={item.quantity} min={1} max={item.quantity} aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-15 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                        <Button size={'icon'} variant={'secondary'}>
                                            <PiPlus />
                                        </Button>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">${item.price}</TableCell>
                                <TableCell className='text-right'>
                                    <Button size={'icon'} variant={'secondary'}>
                                        <PiTrash />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div>
                <div className='flex flex-col gap-3 my-5 w-full items-center'>
                    <p>Total bill: $1000</p>
                    <Button size={'lg'}>Payment</Button>
                </div>
            </div>
        </div>

    );
}
