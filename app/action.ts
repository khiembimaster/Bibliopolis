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
const maxPriceBook = async () => {
    const maxPrice = await prisma.book.findFirst({
        select: {
            price: true
        },
        orderBy: {
            price: 'desc'
        }
    });
    console.log(maxPrice?.price)
    return Number(maxPrice?.price); 
}
const searchBooksByName = async (name: string, priceStart: number, priceFinish: number, currentPage: number, pageSize: number) => {
    console.log("1112 " + priceStart )
    const books = await prisma.book.findMany({
        where: {
            AND: [
                {
                    title: {
                        contains: name 
                    }
                },
                {
                    price: {
                        gte: priceStart, 
                        lte: priceFinish 
                    }
                }
            ]
        },
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
    });
    const totalBooksCount = await prisma.book.count({
        where: {
            AND: [
                {
                    title: {
                        contains: name 
                    }
                },
                {
                    price: {
                        gte: priceStart, 
                        lte: priceFinish 
                    }
                }
            ]
        }
    });
    const totalPage = Math.ceil(totalBooksCount / pageSize); // Tính toán tổng số trang
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
                id: bookDetail?.id || 0,
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

const createOrder = async (userId: string, cartId: number, shippingAddress: string, total_price: number, cartList: { id: number, book: { id: number, image: string, name: string, price: number, quantity: number }, quantity: number }[]) => {
    try {
        const newOrder = await prisma.order.create({
            data: {
                userId: userId,
                shipping_address: shippingAddress,
                total_price: total_price,
                billing_address: "",
                status: "UNPAID",
                order_date: new Date(),
                books: {
                    createMany: {
                        data: cartList.map(item => ({
                            bookId: item.book.id, 
                            quantity: item.quantity
                           
                        }))
                    }
                }
            },
            select: {
                id: true
            }
        });
        await Promise.all(cartList.map(async item => {
            await deleteCartItem(userId, cartId, item.book.id, 0);
        }));
        return newOrder;
    } catch (error) {
        console.error("Error creating order:", error);
        throw new Error("Failed to create order");
    }
}

export { GetAllBook, GetByBookDetail, addToCart, createCart, getToYourCart, deleteItemCart, updateItemCart,
     updateCartItemQuantity, deleteCartItem, getBooksInCart, searchBooksByName, maxPriceBook, createOrder }