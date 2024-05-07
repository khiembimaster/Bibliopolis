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
    text-white focus:outline-none " onClick={
    ()=>{
        
        RemoveGenre(bookid,genre.id)
   }}>
   ✗
   </button>

}
export {RemoveGenreButton}