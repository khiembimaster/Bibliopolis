"use client"

import { DeleteBook } from "@/app/actions"
import { AddGenreButton } from "@/components/book-components/addgenre-buttton"
import { BookImage } from "@/components/book-components/bookimage"
import { EditBook } from "@/components/book-components/edit-bookdescription"
import { GenreList } from "@/components/book-components/genreList"
import { UpdateButton } from "@/components/book-components/updateBook-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookFull } from "@/type/type"
import { ColumnDef } from "@tanstack/react-table"


function formatDate(inputDate: string): string {
  const parts = inputDate.split("/");
  const day = parts[0].padStart(2, "0");
  const month = parts[1].padStart(2, "0");
  const year = parts[2];

  return `${year}-${month}-${day}`;
}

export const columns: ColumnDef<BookFull>[] = [
  
  
  {
    
    accessorKey: "id",
    header: () => "ID",
    cell: ({ row }) => {
      const book = row.original;
      return (
        <>
          <div className="font-medium">{book.id}</div>

        </>
      )
    }
  },
  {
    accessorKey: "title",
    header: () => <div className="hidden sm:table-cell">Title</div>,
    cell: ({ row }) => {
      const book = row.original;
      const title = row.getValue("title") as string
      return <Input id={"inputTitle" + String(book.id)} defaultValue={title} />
    }
  },
  {
    accessorKey: "author",
    header: () => <div className="hidden sm:table-cell">Author</div>,

    cell: ({ row }) => {
      const author = row.getValue("author") as string
      const book = row.original;
      return <Input id={"inputAuthor" + String(book.id)} defaultValue={author} />
    }
  },
  {
    accessorKey: "genres",
    header: () => <div className="hidden sm:table-cell">Genres</div>,

    cell: ({ row }) => {
      const book = row.original;
      //const genres = book.genres;
      return <div className="text-right md:mr-10">
        <GenreList book={book}></GenreList>
        <AddGenreButton book={book} />
      </div>
    },
  },
  {
    accessorKey: "isbn",
    header: () => <div className="hidden sm:table-cell">Isbn</div>,

    cell: ({ row }) => {
      const book = row.original;
      //const genres = book.genres;
      return <Input id={"inputIsbn" + String(book.id)} defaultValue={book.isbn} />
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="hidden sm:table-cell">Price</div>,

    cell: ({ row }) => {
      const book = row.original;
      //const genres = book.genres;
      return <Input id={"inputPrice" + String(book.id)} defaultValue={book.price.toString()} />
    },
  },

  {
    accessorKey: "publisher",
    header: () => <div className="hidden sm:table-cell">Publisher</div>,

    cell: ({ row }) => {
      const book = row.original;
      //const genres = book.genres;
      return <Input id={"inputPublisher" + String(book.id)} defaultValue={book.publisher} />
    },
  },
  {
    accessorKey: "publication_date",
    header: () => <div className="hidden sm:table-cell">Publication date</div>,

    cell: ({ row }) => {
      const book = row.original;
      //const genres = book.genres;
      return <Input id={"inputDate" + String(book.id)} type="date" defaultValue={formatDate(book.publication_year.toLocaleDateString())} />
    }
  },
  {
    accessorKey: "stock_quantity",
    header: () => <div className="hidden sm:table-cell">Stock Quantity</div>,

    cell: ({ row }) => {
      const book = row.original;
      //const genres = book.genres;
      return <Input id={"inputQuantity" + String(book.id)} className="w-full" defaultValue={String(book.stock_quantity)} />
    },
  },
 
  {
    accessorKey: "bookimage",
    header: () => <div className="hidden sm:table-cell">Image</div>,

    cell: ({ row }) => {
      const book = row.original;
      //const genres = book.genres;
      return <div>

       <BookImage book={book}></BookImage>

      </div>
    },

  },
  {
    accessorKey: "description",
    header: () => <div className="hidden sm:table-cell">Description</div>,

    cell: ({ row }) => {
      const book = row.original;
      //const genres = book.genres;
      return <div id={"description" + String(book.id)}>  <EditBook book={book}/></div>
    },

  },
{
    accessorKey: "update-delete",
    header: () => <div className="hidden sm:table-cell"></div>,

    cell: ({ row }) => {
      const book = row.original;
      //const genres = book.genres;
      return <div>

        <UpdateButton id={book.id} book={book} />
        <Button className="bg-red-500 hover:bg-red-600" onClick={() => {
          DeleteBook(book.id);
          window.location.reload();

        }}>✗</Button>

      </div>
    },

  },
 
  




]