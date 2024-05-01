'use server'
import { Book } from "@prisma/client";
import prisma from "../client"




const GetAllBook = async () =>{
    const books = await prisma.book.findMany({
        include:{
            genres: true
        }
    })
    return books;

}

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

const CreateGenre  = async function createGenre(name: string, description: string) {
    const createGenre = await prisma.genre.create({
        data:{
            name: name,
            description: description,
        }
    })
}

const GetAllGenre = async() => {
    const getAllGenre = await prisma.genre.findMany({
        include: {
            books:true
        }
    });
    return getAllGenre;
}

const UpdateBook = async function updateBook(id: number, data: Book){
    const instance = await prisma.book.findUnique({
        where: {id: id},
        include: {
            genres: true
        }
    })
   

    const updateBook = await prisma.book.update({
        where: {
            id: id
        },
        data: {
            title: data.title,
            author: data.author,
            price: data.price,
            publication_year: data.publication_year,
            stock_quantity: data.stock_quantity,
            publisher: data.publisher,
            cover_image: data.cover_image,
            isbn: data.isbn,
            description: data.description,
            rating: data.rating,
            genres: {
                set: instance?.genres
            }

        }
    })
}

const AddBookToGenre = async function addBookToGenre(idBook: number, idGenre: number) {

    const updateBook = await prisma.book.update({
        where:{id:idBook},
        data: {
            genres:{
                connect:{
                    id: idGenre
                }
            }
        }
    })
}

export {CreateBook,GetAllBook,UpdateBook,CreateGenre,GetAllGenre,AddBookToGenre}

