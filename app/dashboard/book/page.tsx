
import { auth } from '@/auth';
import {AddbookSheet} from '@/components/book-components/addbook-sheet'
import { AddgenreSheet } from '@/components/book-components/addgenre-sheet';


import { BookTable } from '@/components/book-components/book-table';
const Book = async () => {
    const session = await auth();
    
    return (<div className='grid col-span-3'>
            <p>Welcome to book management page</p>
            <AddbookSheet></AddbookSheet>
            <AddgenreSheet></AddgenreSheet>
            <BookTable></BookTable>     
          </div>)

}

export default Book