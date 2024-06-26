'use server'
import { use } from "react";
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
const searchBooksByName = async (name: string, genreId: number, priceStart: number, priceFinish: number, currentPage: number, pageSize: number) => {
    console.log("1112 " + priceStart)
    if(genreId === 0)
        {
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
        else{
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
                        },
                        {
                            genres: {
                                some: {
                                    id: genreId
                                }
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
const getCart = async (userId: string) => {
    const existingCart = await prisma.cart.findFirst({
        where: {
            userId: userId
        },
    });
    return existingCart?.id

}
const updateItemCart = async (userId: string, total_price: number, cartId: number, bookId: number, quantity: number) => {
    const book = await prisma.book.findFirst({
        where: {
            id: bookId
        }
    })
    const updatedBookQuantity = Number(book?.stock_quantity) - quantity;
            await prisma.book.update({
                where: {
                    id: bookId,
                },
                data: {
                    stock_quantity: updatedBookQuantity
                },
            });
    const existingCart = await prisma.cart.findUnique({
        where: {
            userId: userId,
        },
    });

    if (existingCart) {
        const existingItem = await prisma.booksToCarts.findFirst({
            where: {
                bookId: bookId,
                cartId: Number(existingCart?.id),
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
                                    cartId: Number(existingCart?.id),
                                },
                            },
                            data: {
                                quantity: quantity + existingItem.quantity,
                            },
                        },
                    },
                },
            });
            
        
            return updatedCart;
        } else {
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
        // Nếu người dùng chưa có giỏ hàng, tạo mới giỏ hàng và thêm sách vào
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
};

const updateCartItemQuantity = async (userId: string, cartId: number, bookId: number, newQuantity: number, total_price: number) => {
    const existingCart = await prisma.cart.findFirst({
        where: {
            userId: userId
        },
    });

    if (!existingCart) {
        throw new Error("Cart not found.");
    }

    const existingItem = await prisma.booksToCarts.findFirst({
        where: {
            bookId: bookId,
            cartId: Number(existingCart.id),
        },
    });

    if (!existingItem) {
        throw new Error("Item not found in the cart.");
    }
    const book = await prisma.book.findFirst({
        where: {
            id: bookId
        }
    })
    let updatedBookQuantity = 0;
    const quantityDiff = newQuantity - existingItem.quantity;
        await prisma.book.update({
            where: {
                id: bookId,
            },
            data: {
                stock_quantity:  Number(book?.stock_quantity) - quantityDiff
            },
        });

    // Cập nhật số lượng sách trong giỏ hàng
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
                            cartId: Number(existingCart.id)
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
};



const deleteCartItem = async (userId: string, cartId: number, bookId: number, total_price: number) => {
    const existingCart = await prisma.cart.findFirst({
        where: {
            userId: userId
        },
    });
    const existingItem = await prisma.booksToCarts.findFirst({
        where: {
            bookId: bookId,
            cartId: Number(existingCart?.id),
        },
    });

    const book = await prisma.book.findFirst({
        where: {
            id: bookId
        }
    })
        await prisma.book.update({
            where: {
                id: bookId,
            },
            data: {
                stock_quantity:  Number(book?.stock_quantity) + Number(existingItem?.quantity)
            },
        })
    const updatedCart = await prisma.cart.update({
        where: {
            userId: userId
        },
        data: {
            total_price: total_price,
            books: {
                deleteMany: [{ bookId: bookId, cartId: Number(existingCart?.id) }],
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
                image: bookDetail?.cover_image || '',
                name: bookDetail?.title || '',
                price: Number(bookDetail?.price) || 0,
                quantity: bookDetail?.stock_quantity || 0
            },
            quantity: book.quantity
        };
    }));

    return transformedItems;
}

const createOrder = async (userId: string, cartId: number, shippingAddress1: string, shippingAddress2: string, city: string, country: string, name: string, phone: string, email: string, total_price: number, cartList: { id: number, book: { id: number, image: string, name: string, price: number, quantity: number }, quantity: number }[]) => {
    try {
        const existingCart = await prisma.cart.findFirst({
            where: {
                userId: userId
            },
        });
        const newOrder = await prisma.order.create({
            data: {
                userId: userId,
                total_price: total_price,
                status: "UNAPPROVED",
                order_date: new Date(),
                shippingInfo: {
                    create: {
                        addressLine1: shippingAddress1,
                        addressLine2: shippingAddress2,
                        city: city,
                        country: country,
                        phone: phone,
                        name: name,
                        email: email,
                    }
                },
                books: {
                    createMany: {
                        data: cartList.map(item => ({
                            bookId: item.book.id,
                            quantity: item.quantity,
                            total: 0
                            
                        }))
                    }
                }
            },
            select: {
                id: true
            }
        });
        await Promise.all(cartList.map(async item => {
            await deleteCartItem(userId, Number(existingCart?.id), item.book.id, 0);
        }));
        return newOrder;
    } catch (error) {
        console.error("Error creating order:", error);
        throw new Error("Failed to create order");
    }
}
const findAllGenre = async () => {
    try {

        const genres = await prisma.genre.findMany();

        return genres;
    } catch (error) {
        console.error("Error finding all genres:", error);
        throw new Error("Failed to find all genres");
    }
}
const findAllOrder = async (userId: string) => {
    console.log(userId)
    const listOrder = await prisma.order.findMany({
        where: {
            userId: userId,
        }
    });
    console.log(listOrder)
    return listOrder;
};
const getBookOrder = async (orderId: string) => {
    try {
        const order = await prisma.order.findFirst({
            where: {
                id: orderId,
            },
            include: {
                books: {
                    include: {
                        book: true,
                    },
                },
            },
        });
        if (!order) {
            throw new Error(`Order with ID ${orderId} not found.`);
        }

        const transformedItems = await Promise.all(order.books.map(async (item) => {
            const bookDetail = await GetByBookDetail(item.bookId);
            return {
                id: item.book.id,
                book: {
                    id: bookDetail?.id || 0,
                    image: bookDetail?.cover_image || '',
                    name: bookDetail?.title || '',
                    price: Number(bookDetail?.price) || 0,
                    quantity: bookDetail?.stock_quantity || 0
                },
                quantity: item.quantity || 0,
            };
        }));

        return transformedItems;
    } catch (error) {
        throw new Error("Failed to fetch books in order detail.");
    }
};
const getOrder = async (orderId: string) => {
    const order = await prisma.order.findFirst(
        {
            where: {
                id: orderId
            }
        }
        
    )
    return order
}
const getGenresOfBook = async (bookId: number) => {
    try {
        const book = await prisma.book.findUnique({
            where: {
                id: bookId
            },
            include: {
                genres: true
            }
        });

        if (!book) {
            throw new Error(`Book with ID ${bookId} not found.`);
        }

        return book.genres;
    } catch (error) {
        throw new Error(`Failed to fetch genres of book: `);
    }
};
const getShippingInfo = async (orderId: string) => {
    const shippingInfo = await prisma.shippingInfo.findFirst({
        where: {
            orderId: orderId
        }
    })
    return shippingInfo
}
export {
    GetAllBook,getShippingInfo,getGenresOfBook, getOrder, GetByBookDetail, findAllOrder, addToCart, createCart, getToYourCart, deleteItemCart, updateItemCart,
    updateCartItemQuantity, deleteCartItem, getBooksInCart, searchBooksByName, maxPriceBook, createOrder, findAllGenre, getCart, getBookOrder
};