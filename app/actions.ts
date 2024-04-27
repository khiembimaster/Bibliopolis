
import prisma from "../client"


async function createBook(title: string, author: string, price: number, 
    year: Date, quantity: number, publisher: string, image: string){

    let newBook = prisma.book ;
  
    const book = await prisma.book.create({
        data: {
            title: title,
            author: author,
            price: price,
            publication_year: year,
            stock_quantity: quantity,
            publisher: publisher,
            cover_image: image,
            isbn: '',
            description: '',
            rating: 0
        }
    });



}