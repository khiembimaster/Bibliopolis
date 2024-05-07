'use client'
import React from 'react';
import { Button } from "../ui/button";
import { UpdateBook } from '@/app/actions';
import { Book, Genre } from "@prisma/client";
import Decimal from 'decimal.js';

const handle = async (id: number, book: Book) => {
    console.log(id);
    console.log(book)
    UpdateBook(id, book);
}
interface MyComponentProps {
    id: number
    book: Book
}
const newBook = (book: Book) => {
    const inputTitle = document.getElementById(`inputTitle${String(book.id)}`) as HTMLInputElement;
    const inputAuthor = document.getElementById(`inputAuthor${String(book.id)}`) as HTMLInputElement;
    const inputIsbn = document.getElementById(`inputIsbn${String(book.id)}`) as HTMLInputElement;
    const inputPublisher = document.getElementById(`inputPublisher${String(book.id)}`) as HTMLInputElement;
    const inputDate = document.getElementById(`inputDate${String(book.id)}`) as HTMLInputElement;
    const inputQuantity = document.getElementById(`inputQuantity${String(book.id)}`) as HTMLInputElement;
    const inputPrice = document.getElementById(`inputPrice${String(book.id)}`) as HTMLInputElement;
    const inputDescription = document.getElementById(`inputDescription${String(book.id)}`) as HTMLInputElement;
    let title = inputTitle.value;
    let author = inputAuthor.value;
    let isbn = inputIsbn.value;
    let publisher = inputPublisher.value;
    let date = new Date(inputDate.value);
    let quantity = Number(inputQuantity.value);
    let price = new Decimal(inputPrice.value)

    if (inputDescription != null) {
        let description = inputDescription.value;
        book.description = description;
    }
    book.title = title;
    book.author = author;
    book.isbn = isbn;
    book.publication_year = date;
    book.publisher = publisher;
    book.stock_quantity = quantity;
    book.price = price;


    return book;
}
const UpdateButton: React.FC<MyComponentProps> = ({ id, book }) => {

    return <Button onClick={
        () => {
            handle(id, newBook(book))
            //  console.log(book);
        }
    } className="bg-blue-500 hover:bg-blue-600">✓</Button>
}

export { UpdateButton }