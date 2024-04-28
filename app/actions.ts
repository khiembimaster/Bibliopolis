
'use server'
import prisma from "../client"


const CreateBook = async function createBook(title: string, date: Date, author: string,
    prices: number, quantity: number, publisher: string, image:string ){


    const book = await prisma.book.create({
        data: {
            title: title,
            author: author,
            price: prices,
            publication_year: date,
            stock_quantity: quantity,
            publisher: publisher,
            cover_image: image,
            isbn: '',
            description: '',
            rating: 0
        }
    });



}

export {CreateBook}