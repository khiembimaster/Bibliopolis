'use client'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import React from 'react';
import { Book } from "@prisma/client";
interface MyComponentProps {
    book: Book;
   
 }

const EditBook :React.FC<MyComponentProps> = ( {book} ) => {
    return <main>
        <Popover>
            <PopoverTrigger className="bg-black hover:bg-blue-700 text-white px-2 rounded" >description</PopoverTrigger>
            <PopoverContent>
                <Card>
                    <CardContent>
                        <div className="w-full">
                       
                            <Textarea id={"inputDescription"+String(book.id)} className="h-[200px] w-full"  defaultValue={book.description}/>
                           
                        </div>
                    </CardContent>
                </Card>
            </PopoverContent>
        </Popover>
    </main>
}

export{EditBook}