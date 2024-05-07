
import { auth } from '@/auth';
import { AddbookSheet } from '@/components/book-components/addbook-sheet'
import { AddgenreSheet } from '@/components/book-components/addgenre-sheet';
import { GetAllBook, GetAllGenre } from '@/app/actions';
import React, { useEffect, useState } from 'react';
import { BookTable } from '@/components/book-components/book-table';
import { DataTable } from './data-table';
import { columns } from './columns';
const Book = async () => {



  const session = await auth();

  let books = await GetAllBook()
  let genres = await GetAllGenre();
  console.log("books")

  return <div className="grid col-span-3" >
    <p>Welcome to book management page</p>
    <AddbookSheet></AddbookSheet>
    <AddgenreSheet></AddgenreSheet>
    <DataTable columns={columns} data={books} ></DataTable>
  </div>




}

export default Book