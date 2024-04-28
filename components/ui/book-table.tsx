import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { GetAllBook } from "@/app/actions"

 
   
 


  export async function BookTable() {
    let books = await GetAllBook();
    
    console.log("books")
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader >
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Publisher</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell >{book.publisher}</TableCell>
            </TableRow>
          ))}
        </TableBody>
     
      </Table>
    )
  }