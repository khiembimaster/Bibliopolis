
import Decimal from "decimal.js";
type BookFull = 
    {
        genres: {
            id: number;
            name: string;
            description: string;
        }[];
    } & {
        id: number;
        title: string;
        author: string;
        isbn: string;
        price: Decimal;
        publication_year: Date;
        description: string;
        cover_image: string;
        publisher: string;
        stock_quantity: number;
        rating: Decimal;
    }
type GenreFull = 
    {
        books: {
            id: number;
            title: string;
            author: string;
            isbn: string;
            price: Decimal;
            publication_year: Date;
            description: string;
            cover_image: string;
            publisher: string;
            stock_quantity: number;
            rating: Decimal;
        }[];
    } & {
        id: number;
    name: string;
    description: string;
    }
export type {BookFull,GenreFull} ;