import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { storage } from "@/firebaseConfig"
import { BookFull } from "@/type/type"
import { getBytes, ref } from "firebase/storage"

import { use, useEffect, useState } from "react"
  
interface MyComponentProps {
    book: BookFull
    // genres: GenreFull[]
}


const BookImage : React.FC<MyComponentProps> = ({book}) =>{

    

   return <HoverCard>
  <HoverCardTrigger>Image</HoverCardTrigger>
  <HoverCardContent>
  <img src={book.cover_image} alt="Image" />
  </HoverCardContent>
</HoverCard>

}
export {BookImage}