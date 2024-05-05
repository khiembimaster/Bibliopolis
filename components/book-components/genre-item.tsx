'use client'

import { Book, Genre } from "@prisma/client"
import { AddBookToGenre } from "@/app/actions"

interface MyComponentProps{
    genre: Genre,
    bookid: number

}
const GenreItem : React.FC<MyComponentProps> = ({genre,bookid}) =>{
    return <li className='hover:bg-blue-200 cursor-pointer' onClick={()=>{
        AddBookToGenre(bookid,genre.id)
    }}>{genre.name}</li> 

}
export {GenreItem}