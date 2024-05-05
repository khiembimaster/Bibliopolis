'use client'

import { Book, Genre } from "@prisma/client"
import { AddBookToGenre } from "@/app/actions"
import { RemoveGenre } from "@/app/actions"
interface MyComponentProps{
    genre: Genre,
    bookid: number

}
const RemoveGenreButton : React.FC<MyComponentProps> = ({genre,bookid}) =>{
   return  <button className="flex  text-xs 
   items-center justify-center p-2 rounded-full 
   bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600" onClick={
    ()=>{
        
        RemoveGenre(bookid,genre.id)
   }}>
   ✗
   </button>

}
export {RemoveGenreButton}