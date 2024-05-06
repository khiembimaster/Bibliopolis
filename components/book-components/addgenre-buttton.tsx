
import React from 'react';
import { Button } from "../ui/button";
import { UpdateBook } from '@/app/actions';
import { Book } from "@prisma/client";
import Decimal from 'decimal.js';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { GetAllGenre } from '@/app/actions';
import { AddBookToGenre } from '@/app/actions';
import { GenreItem } from './genre-item';
import { Genre } from '@prisma/client';
interface MyComponentProps {
   
    book: Book
}



const AddGenreButton: React.FC<MyComponentProps> = async ({book }) => {

    
    let genres =await GetAllGenre();
    console.log("abc");
    for (const g of genres){
        if (g.books.includes(book)) {
            genres.splice(0,1);
        }
    }
  
    return <Popover>
    <PopoverTrigger className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >⇦</PopoverTrigger>
    <PopoverContent>
        <ul>
            
            {genres.map((genre)=>(
               
                <div key={genre.id}>
                   <GenreItem genre={genre as Genre} bookid={book.id}/>
                </div>
             
            )) 

            }
        </ul>
     
    </PopoverContent>
    </Popover>
}



export {AddGenreButton};
