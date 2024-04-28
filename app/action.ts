'use server'
import prisma from "../client"


const GetAllBook = async (currentPage: number, pageSize: number) =>{
    const books = await prisma.book.findMany({
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
    });
    const totalBooksCount = await prisma.book.count(); // Corrected line
    const totalPage = Math.ceil(totalBooksCount / pageSize); // Calculate total pages
    return { books, totalPage };
}

const GetByBookDetail = async (id: string) => {
    const result = await prisma.book.findFirst({
        where: {
          id: parseInt(id)
        }
    })
    return result;
}
const addToCart = async (bookId: number, cartId: number, quantity: number ) => {
    const result = await prisma.booksToCarts.create({
        data: {
          bookId: bookId,
          cartId: cartId,
          quantity: quantity
        },
    })
    return result;
}
const createCart = async (userId: string, total_price: number) => {
    const result = await prisma.cart.create({
        data: {
            userId: userId,
            total_price:  total_price,
        },
    })
    return result;
}
const getToYourCart = async (userId: string) => {
    const result = await prisma.cart.findFirst({
        where: {
          userId: userId
        }
    })
    return result; 
}

const deleteItemCart = async (id: number) => {
    const result = await prisma.cart.delete({
        where: {
          id: id
        }
    })
    return result; 
}

const updateItemCart = async (id: number, total_price: number) => {
    const result = await prisma.cart.update({
        where: {
          id: id
        },
        data: {
            total_price: total_price
        },
    })
    return result; 
}

export {GetAllBook, GetByBookDetail, addToCart, createCart, getToYourCart, deleteItemCart, updateItemCart}