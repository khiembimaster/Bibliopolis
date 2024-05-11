import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { storage } from "@/firebaseConfig"
import { BookFull } from "@/type/type"
import { getBytes, ref } from "firebase/storage"
import Image from 'next/image';
import { use, useEffect, useState } from "react"
  
interface MyComponentProps {
    book: BookFull
    // genres: GenreFull[]
}


const BookImage : React.FC<MyComponentProps> = ({book}) =>{

  
   return <HoverCard>
  <HoverCardTrigger>Image</HoverCardTrigger>
  <HoverCardContent>
  {/* // eslint-disable-next-line @next/next/no-img-element */}
  <Image
      src={book.cover_image}
      alt="Landscape picture"
      width={200}
       height={200}
    />
  </HoverCardContent>
</HoverCard>

}
export {BookImage}