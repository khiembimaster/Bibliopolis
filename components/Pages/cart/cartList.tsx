"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PiMinus, PiPlus, PiTrash } from "react-icons/pi";
import {
  createOrder,
  deleteCartItem,
  getBooksInCart,
  getCart,
  updateCartItemQuantity,
} from "@/app/action"; // Import the necessary action functions
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CartList() {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user.id;
  const [cartId, setCartID] = useState<number>(NaN);
  const [items, setItems] = useState<
    {
      id: number;
      book: {
        id: number;
        image: string;
        name: string;
        price: number;
        quantity: number;
      };
      quantity: number;
    }[]
  >([]);
  const [showDialog, setShowDialog] = useState(false);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const itemList = await getBooksInCart(userId);
        const dbCartId = await Number(getCart(userId));
        setCartID(dbCartId);
        setItems(itemList);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [userId]);

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
    const { id: bookId } = updatedItems[index];
    const total_price = items.reduce(
      (total, item) => total + item.quantity * item.book.price,
      0
    );
    await updateCartItemQuantity(
      userId,
      cartId,
      bookId,
      newQuantity,
      total_price
    );
  };
  const handleDeleteItem = async (index: number) => {
    const { id: bookId } = items[index];
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);

    // Delete the item from the cart in the database
    const total_price = updatedItems.reduce(
      (total, item) => total + item.quantity * item.book.price,
      0
    );
    await deleteCartItem(userId, cartId, bookId, total_price);
  };

  const handlePayment = async () => {
    const totalBill = items.reduce(
      (total, item) => total + item.quantity * item.book.price,
      0
    );
    if (totalBill === 0) {
      return;
    } else {
      setShowDialog(true);
    }
  };
  const checkout = async () => {
    const shippingAddress = document.getElementById(
      "address"
    ) as HTMLInputElement;
    console.log(shippingAddress.value);
    const totalBill = items.reduce(
      (total, item) => total + item.quantity * item.book.price,
      0
    );
    if (totalBill === 0) {
      return;
    } else {
      try {
        const response = await fetch("http://localhost:3000/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            products: items,
            userId,
            cartId,
            shippingAddress: shippingAddress.value,
            totalBill: totalBill,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        console.log(responseData);
        if (responseData.url) {
          window.location.href = responseData.url;
        }
      } catch (error) {
        console.error("Error during checkout:", error);
      }
    }
  };

  return (
    <div className="grid gap-10 grid-cols-4 ms-10 mt-10">
      <div className="col-span-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="w-[250px]">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="flex items-center gap-1">
                  <div style={{ marginRight: "10px" }}>
                    <Image
                      src={item.book.image}
                      alt={item.book.name}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="font-medium">{item.book.name}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size={"icon"}
                      variant={"secondary"}
                      onClick={() =>
                        handleQuantityChange(index, item.quantity - 1)
                      }>
                      <PiMinus />
                    </Button>
                    <input
                      type="number"
                      id="productQuantity"
                      value={item.quantity}
                      min={1}
                      max={item.book.quantity}
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-15 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      readOnly
                    />
                    <Button
                      size={"icon"}
                      variant={"secondary"}
                      onClick={() =>
                        handleQuantityChange(index, item.quantity + 1)
                      }>
                      <PiPlus />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-right">${item.book.price}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size={"icon"}
                    variant={"secondary"}
                    onClick={() => handleDeleteItem(index)}>
                    <PiTrash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <div className="flex flex-col gap-3 my-5 w-full items-center">
          <p>
            Total bill: $
            {items.reduce(
              (total, item) => total + item.quantity * item.book.price,
              0
            )}
          </p>
          <Dialog open={showDialog}>
            <DialogTrigger asChild>
              <Button size={"lg"} onClick={handlePayment}>
                Payment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Order information</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Full name
                  </Label>
                  <Input id="name" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4 mt-5">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Input id="address" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4 mt-5">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="phone" className="col-span-3" required />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={checkout}>Done</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
