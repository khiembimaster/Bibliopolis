  'use client'
  import React, { useState, useEffect } from 'react';
  import Image from 'next/image';
  import Link from 'next/link';
  import { GetAllBook, findAllGenre, maxPriceBook, searchBooksByName } from '@/app/action';
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
  import { Slider } from "@/components/ui/slider"

  export default function ProductList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [books, setBooks] = useState<Book[]>([]);
    const [totalPage, setTotalPage] = useState(0);
    const [maxPrice, setMaxPrice] = useState<number | null>(null); // Add state for max price
    const [genres, setGenres] = useState<string[]>([]); 
    const [genreId, setGenreId] = useState<number | 0>(0);
    useEffect(() => {
      async function fetchData() {
        await fetchBooks(currentPage);
        await fetchMaxPrice();
        await fetchGenres();
      }
      fetchData();
    }, [currentPage]);
    const fetchGenres = async () => {
      try {
        const genres = await findAllGenre();
        setGenres(genres.map(genre => genre.name)); // Assume genre object has a property 'name'
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    const fetchBooks = async (page: number) => {
      console.log("Fetching books for page:", page);
      const { books: fetchedBooks, totalPage: fetchedTotalPage } = await GetAllBook(page, 10);
      setBooks(fetchedBooks);
      setTotalPage(fetchedTotalPage);
    };

    const fetchMaxPrice = async () => {
      const max = await maxPriceBook();
      setMaxPrice(max);
    };

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
    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedGenre = event.target.value;
      const genreIndex = genres.indexOf(selectedGenre);
      if (genreIndex !== -1) {
        setGenreId(genreIndex + 1); 
      } else {
        setGenreId(0); 
      }
    };
    const handleSearch = async () => {
      const name = (document.getElementById("search") as HTMLInputElement).value;
      const priceMin = Number((document.getElementById("priceMin") as HTMLInputElement).value);
      const priceMax = Number((document.getElementById("priceMax") as HTMLInputElement).value); // If maxPrice is not set yet, use 0 as default
      const { books: fetchedBooks, totalPage: fetchedTotalPage } = await searchBooksByName(name, 1, priceMin, priceMax, currentPage, 10);
      setBooks(fetchedBooks);
      setTotalPage(fetchedTotalPage);
    };

    return  (
      <div className='grid '>
        <div className='grid grid-cols-3'>
          <div className="col-start-1">
            <select onChange={handleGenreChange} id="genre" className="block w-50 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="">-- Select genre --</option>
              {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
            </select>
          </div>
          <div className="col-start-2 justify-self-end">
            <div className=' inline-flex self-center'>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price min:</label>
              <input type="number" id="priceMin" min={1} max={Number(maxPrice)} defaultValue={0} aria-describedby="helper-text-explanation" className="block w-full p-2.5 bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
            </div>
            <div className=' inline-flex self-center ms-3'>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price max:</label>
              <input type="number" id="priceMax" min={1} max={Number(maxPrice)} defaultValue={Number(maxPrice)} aria-describedby="helper-text-explanation" className="block w-full p-2.5 bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
            </div>
          </div>
          <div className="flex ms-3 col-start-3">
            <div className=" flex-grow mr-4">
              <input type="search" id="search" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
            </div>
            <div>
              <Button className="h-full" onClick={handleSearch}>Search</Button>
            </div>
          </div>
        </div>
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
