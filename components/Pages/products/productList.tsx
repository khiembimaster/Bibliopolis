'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GetAllBook } from '@/app/action';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from '@/components/ui/button';
import { Book } from './Book';


export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState<Book[]>([]); // Provide the correct type for the initial state
  const [totalPage, setTotalPage] = useState(0);

  const fetchBooks = async (page: number) => {
    console.log("Fetching books for page:", page);
    const { books: fetchedBooks, totalPage: fetchedTotalPage } = await GetAllBook(page, 10);
    setBooks(fetchedBooks);
    setTotalPage(fetchedTotalPage);
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const handlePaginationPrevious = () => {
    console.log("Previous button clicked");
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handlePaginationNext = () => {
    console.log("Next button clicked");
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePaginationClick = (pageIndex: number) => {
    console.log("Page", pageIndex, "clicked");
    setCurrentPage(pageIndex);
  };
  return (
    <div className='grid'>
      <div className='grid grid-cols-4 gap-5 mt-10'>
        {books.map(product => (
          <div key={product.id} className="border rounded p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
            <Link href={`/products/${product.id}`}>
              <div>
                <Image src={product.cover_image} alt={product.title} width={300} height={200} className="w-full h-48 object-cover mb-4" />
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-600">${product.price.toString()}</p>
              </div>
            </Link>
          </div>
        ))}

      </div>
      <div className='mt-10'>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePaginationPrevious} />
          </PaginationItem>
          {[...Array(totalPage)].map((_, index) => (
            <PaginationItem key={index}>
              {currentPage === index + 1 ? (
                <PaginationLink isActive className="active" onClick={() => handlePaginationClick(index + 1)}>
                  {index + 1}
                </PaginationLink>
              ) : (
                <PaginationLink onClick={() => handlePaginationClick(index + 1)}>
                  {index + 1}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={handlePaginationNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      </div>
    </div>


  );
}