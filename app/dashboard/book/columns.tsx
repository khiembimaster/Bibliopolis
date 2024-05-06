"use client"
 
import { AddGenreButton } from "@/components/book-components/addgenre-buttton"
import { GenreList } from "@/components/book-components/genreList"
import { Input } from "@/components/ui/input"
import { BookFull } from "@/type/type"
import { ColumnDef } from "@tanstack/react-table"

  
export const columns: ColumnDef<BookFull>[] = [
  {
    accessorKey: "id",
    header: () => "ID", 
    cell: ({row}) => {
      return(
        <>
          <div className="font-medium">{row.id}</div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {row.id}
          </div>
        </>
      )
    }
  },
  {
    accessorKey: "title",
    header: () => <div className="hidden sm:table-cell">Title</div>,
    cell: ({row}) => {
      const title = row.getValue("title") as string
      return  <Input id={"inputTitle" + String(row.id)} defaultValue={title} />
    }
  },
  {
    accessorKey: "author",
    header: () => <div className="hidden sm:table-cell">Author</div>,

    cell: ({row}) => {
      const author = row.getValue("author") as string
      
      return  <Input id={"inputAuthor" + String(row.id)} defaultValue={author} />
    }
  },
  {
    accessorKey: "genres",
    header:() => <div className="hidden sm:table-cell">Genres</div>,
    
    cell: ({ row }) => {
        const book =row.original;
        //const genres = book.genres;
      return <div className="text-right md:mr-10">
         <GenreList book={book}></GenreList>
          {/* <AddGenreButton book={book}  /> */}
      </div>
    },
  }

]