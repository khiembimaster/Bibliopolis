
import { auth } from '@/auth';
import {AddbookSheet} from '@/components/ui/addbook-sheet'

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from "@/components/ui/context-menu"

import { Button } from "@/components/ui/button"
import { BookTable } from '@/components/ui/book-table';
const Book = async () => {
    const session = await auth();
    
    return <main>

  <p>Welcome to book management page</p>
  <AddbookSheet></AddbookSheet>
 <BookTable></BookTable>

       
    </main>



}

export default Book