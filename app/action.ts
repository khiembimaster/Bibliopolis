'use server'
import prisma from "../client"


const GetAllBook = async (currentPage: number, pageSize: number) => {
    const books = await prisma.book.findMany({
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
    });
    const totalBooksCount = await prisma.book.count(); // Corrected line
    const totalPage = Math.ceil(totalBooksCount / pageSize); // Calculate total pages
    return { books, totalPage };
}

const GetByBookDetail = async (id: number) => {
    const result = await prisma.book.findFirst({
        where: {
            id: id
        }
    })
    return result;
}
const addToCart = async (bookId: number, cartId: number, quantity: number) => {
    console.log(bookId, cartId, quantity)
    const result = await prisma.booksToCarts.create({
        data: {
            bookId: bookId,
            cartId: cartId,
            quantity: quantity
        },
    })
    return result;
}
const createCart = async (userId: string, total_price: number, bookId: number, quantity: number) => {
    const result = await prisma.cart.create({
        data: {
            userId: userId,
            total_price: total_price,
            books:
            {
                createMany: {
                    data: {
                        bookId: bookId,
                        quantity: quantity
                    }
                }
            }
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

const updateItemCart = async (userId: string, total_price: number,cartId: number, bookId: number, quantity: number) => {
    const existingCart = await prisma.cart.findUnique({
        where: {
            userId: userId,
        },
    });
    if (existingCart) {
        console.log(existingCart)
        const existingItem = await prisma.booksToCarts.findFirst({
            where: {
                bookId: bookId,
                cartId: cartId,
            },
        });
    
        if (existingItem) {
            const updatedCart = await prisma.cart.update({
                where: {
                    userId: userId,
                },
                data: {
                    total_price: total_price,
                    books: {
                        update: {
                            where: { 
                                bookId_cartId: { 
                                    bookId: bookId, 
                                    cartId:cartId 
                                } 
                            },
                            data: {
                                quantity: quantity + existingItem.quantity
                            }
                        }
                    }     
                },
            });
            return updatedCart;
        }
        else{
            const updatedCart = await prisma.cart.update({
                where: {
                    userId: userId,
                },
                data: {
                    total_price: total_price,
                    books: {
                        create: {
                            bookId: bookId,
                            quantity: quantity,
                        },
                    },
                },
            });
            return updatedCart;
        }
        
    } else {
        const newCart = await prisma.cart.create({
            data: {
                userId: userId,
                total_price: total_price,
                books: {
                    create: {
                        bookId: bookId,
                        quantity: quantity,
                    },
                },
            },
        });
        return newCart;
    }

}
const updateCartItemQuantity = async (userId: string, cartId: number, bookId: number, newQuantity: number, total_price: number) => {
    const updatedCart = await prisma.cart.update({
        where: {
            userId: userId
        },
        data: {
            total_price: total_price,
            books: {
                update: {
                    where: { 
                        bookId_cartId: { 
                            bookId: bookId, 
                            cartId:cartId 
                        } 
                    },
                    data: {
                        quantity: newQuantity
                    }
                }
            }        
        }
    });

    return updatedCart;
}


const deleteCartItem = async (userId: string, cartId: number, bookId: number, total_price: number) => {

    const updatedCart = await prisma.cart.update({
        where: {
            userId: userId
        },
        data: {
            total_price: total_price,
            books: {
                deleteMany: [{ bookId: bookId, cartId: cartId }],
            }
        }
    });

    return updatedCart;
}

const getBooksInCart = async (userId: string) => {
    const cart = await prisma.cart.findFirst({
        where: {
            userId: userId
        },
        include: {
            books: true
        }
    });

    if (!cart || !cart.books) {
        return [];
    }

    const transformedItems = await Promise.all(cart.books.map(async (book) => {
        const bookDetail = await GetByBookDetail(book.bookId);
        return {
            id: book.bookId,
            book: {
                image: bookDetail?.cover_image || '', // Provide a fallback value if image is undefined
                name: bookDetail?.title || '', // Provide a fallback value if name is undefined
                price: Number(bookDetail?.price) || 0,
                quantity: bookDetail?.stock_quantity || 0 // Provide a fallback value if price is undefined
            },
            quantity: book.quantity
        };
    }));

    return transformedItems;
}


export { GetAllBook, GetByBookDetail, addToCart, createCart, getToYourCart, deleteItemCart, updateItemCart, updateCartItemQuantity, deleteCartItem, getBooksInCart }