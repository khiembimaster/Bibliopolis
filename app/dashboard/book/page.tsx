
import { auth } from '@/auth';
import {AddbookSheet} from '@/components/book-components/addbook-sheet'
import { AddgenreSheet } from '@/components/book-components/addgenre-sheet';
import { GetAllBook, GetAllGenre } from '@/app/actions';
import React, { useEffect, useState } from 'react';
import { BookTable } from '@/components/book-components/book-table';
import { DataTable } from './data-table';
import { columns } from './columns';
const Book = async () => {
  



    let books = await GetAllBook()
    let genres = await GetAllGenre();
    console.log("books")

    return <main>
      
  <p>Welcome to book management page</p>
  <AddbookSheet></AddbookSheet>
  <AddgenreSheet></AddgenreSheet>
  <DataTable columns={columns} data={books} ></DataTable>
       
    </main>



}

export default Book