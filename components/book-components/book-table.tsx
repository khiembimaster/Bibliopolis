'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { GetAllBook, GetAllGenre } from "@/app/actions"
import { Book } from "@prisma/client";
import { EditBook } from "./edit-bookdescription";
import { UpdateButton } from "./updateBook-button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { UpdateIcon } from "@radix-ui/react-icons";
import { Genre } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { RemoveGenreButton } from "./removegenre-button";
import { AddGenreButton } from "./addgenre-buttton";
import { BookFull, GenreFull } from "@/type/type";
import { useEffect, useState } from "react";
import { Item } from "@radix-ui/react-context-menu";
import { GenreList } from "./genreList";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table"
function formatDate(inputDate: string): string {
    const parts = inputDate.split("/");
    const day = parts[0].padStart(2, "0");
    const month = parts[1].padStart(2, "0");
    const year = parts[2];

    return `${year}-${month}-${day}`;
}



interface MyComponentProps{
  
    books: BookFull[]
    genres: GenreFull[]
}



const BookTable: React.FC<MyComponentProps> = ({books,genres})=> {

   
   const [Books, setBooks] = useState(books);
    return (
        <Table>
            <TableCaption>A list of books.</TableCaption>
            <TableHeader >
                <TableRow>
                    <TableHead >ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>Isbn</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Publisher</TableHead>
                    <TableHead>Publication year</TableHead>
                    <TableHead>Stock quantity</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Description</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {Books.map((book) => (
                  
                    <TableRow key={book.id}>
                        <TableCell id={"id" + String(book.id)} className="font-medium">{book.id}</TableCell>
                        <TableCell>
                            <Input id={"inputTitle" + String(book.id)} defaultValue={book.title} />
                        </TableCell>
                        <TableCell>
                            <Input id={"inputAuthor" + String(book.id)} defaultValue={book.author} />
                        </TableCell>
                        <TableCell>
                           <GenreList book={book}></GenreList>
                         <AddGenreButton book={book} genres={genres} />
                        </TableCell>

                        <TableCell> <Input id={"inputIsbn" + String(book.id)} defaultValue={book.isbn} /></TableCell>
                        <TableCell> <Input id={"inputPrice" + String(book.id)} defaultValue={book.price.toString()} /></TableCell>
                        <TableCell><Input id={"inputPublisher" + String(book.id)} defaultValue={book.publisher} /></TableCell>
                        <TableCell><Input id={"inputDate" + String(book.id)} type="date" defaultValue={formatDate(book.publication_year.toLocaleDateString())} />

                        </TableCell>
                        <TableCell >
                            <Input id={"inputQuantity" + String(book.id)} className="w-full" defaultValue={String(book.stock_quantity)} />

                        </TableCell>
                        <TableCell id={"bookRating" + String(book.id)}>{String(book.rating)}</TableCell>

                        <TableCell><EditBook book={book} /></TableCell>

                        <TableCell>
                            <UpdateButton id={book.id} book={book} />
                            <Button onClick={()=>{
                                let b = Object.assign({},Books);
                                b = Books.filter (item => item!= book);
                                setBooks(Books => b);
                            }} className="bg-red-500 hover:bg-red-600">✗</Button>
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>
            <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </Table>
        
    )
}

export {BookTable}