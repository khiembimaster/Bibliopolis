'use client'

import { Book, Genre } from "@prisma/client"
import { AddBookToGenre } from "@/app/actions"
import { BookFull } from "@/type/type"
import { useState } from "react"
import { RemoveGenreButton } from "./removegenre-button"
interface MyComponentProps {

    book: BookFull

}
const GenreList: React.FC<MyComponentProps> = ({ book }) => {

    const [Book, setBook] = useState(book);

    return <ul>
        {Book.genres.map((genre) => (
            <li className="flex justify-center items-center space-x-4" key={genre.id}>
                <div>{genre.name}</div>
                <div onClick={() => {
                    let b = Object.assign({},Book)
                    b.genres = Book.genres.filter(item => item!= genre);
                    setBook(Book => Book = b);
                }}>
                    <RemoveGenreButton bookid={book.id} genre={genre}></RemoveGenreButton>
                </div>

            </li>

        ))}
    </ul>
}
export { GenreList }