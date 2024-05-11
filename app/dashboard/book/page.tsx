
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
    <p className="text-4xl font-bold text-white-800">Books management</p>
    <div className='flex'>
    <div className="my-2 mx-2"> <AddbookSheet ></AddbookSheet> </div>
    <div className='my-2 mx-2'>  <AddgenreSheet></AddgenreSheet></div>
    </div>
    <DataTable columns={columns} data={books} ></DataTable>
  </div>




}

export default Book