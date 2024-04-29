'use client'
import React, { useEffect, useState } from 'react';
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
import { deleteCartItem, getBooksInCart, updateCartItemQuantity } from '@/app/action'; // Import the necessary action functions

export default function CartList() {
    const userId = "clvictuww0001o83h8g7l3ddt";
    const cartId = 10;
    const [items, setItems] = useState<{ id: number, book: { image: string, name: string, price: number, quantity: number }, quantity: number }[]>([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const itemList = await getBooksInCart(userId);
                setItems(itemList);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);

    const handleQuantityChange = async (index: number, newQuantity: number) => {
        const updatedItems = [...items];
        if (newQuantity < 1) {
            newQuantity = 1; 
        } else if (newQuantity > items[index].book.quantity) {
            newQuantity = items[index].book.quantity; 
        }
        updatedItems[index].quantity = newQuantity;
        setItems(updatedItems);

        // Update the item quantity and total price in the database
        const { id: bookId, book, quantity } = updatedItems[index];
        const total_price = items.reduce((total, item) => total + (item.quantity * item.book.price), 0);
        const c = await updateCartItemQuantity(userId,cartId, bookId, newQuantity, total_price);
    };
    const handleDeleteItem = async (index: number) => {
        const { id: bookId } = items[index];
        const updatedItems = items.filter((item, i) => i !== index);
        setItems(updatedItems);

        // Delete the item from the cart in the database
        const total_price = updatedItems.reduce((total, item) => total + (item.quantity * item.book.price), 0);
        await deleteCartItem(userId, cartId, bookId, total_price);
    };
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
                        {items.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell className='flex items-center gap-1'>
                                    <div style={{ marginRight: '10px' }}>
                                        <Image src={item.book.image} alt={item.book.name} width={100} height={100} />
                                    </div>
                                    <div className='font-medium'>
                                        {item.book.name}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='flex items-center gap-2'>
                                        <Button size={'icon'} variant={'secondary'} onClick={() => handleQuantityChange(index, item.quantity - 1)}>
                                            <PiMinus />
                                        </Button>
                                        <input type="number" id="productQuantity" value={item.quantity} min={1} max={item.book.quantity} aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-15 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required readOnly />
                                        <Button size={'icon'} variant={'secondary'} onClick={() => handleQuantityChange(index, item.quantity + 1)}>
                                            <PiPlus />
                                        </Button>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">${item.book.price}</TableCell>
                                <TableCell className='text-right'>
                                    <Button size={'icon'} variant={'secondary'} onClick={() => handleDeleteItem(index)}>
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
                    {/* Tính tổng giá trị của giỏ hàng */}
                    <p>Total bill: ${items.reduce((total, item) => total + (item.quantity * item.book.price), 0)}</p>
                    <Button size={'lg'}>Payment</Button>
                </div>
            </div>
        </div>
    );
}


